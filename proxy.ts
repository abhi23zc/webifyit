import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "admin_session";

/**
 * Lightweight token verification for proxy (uses Web Crypto API).
 * Performs constant-time signature comparison and expiry check.
 */
async function verifyTokenEdge(
  token: string,
  secret: string
): Promise<boolean> {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;

    // Create HMAC key using Web Crypto
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    // Sign the encoded payload
    const signatureArrayBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(encoded)
    );

    // Convert to hex string
    const expectedSig = Array.from(new Uint8Array(signatureArrayBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Constant-time comparison
    if (expectedSig.length !== signature.length) return false;

    let mismatch = 0;
    for (let i = 0; i < expectedSig.length; i++) {
      mismatch |= expectedSig.charCodeAt(i) ^ signature.charCodeAt(i);
    }

    if (mismatch !== 0) return false;

    // Verify expiry
    const payload = JSON.parse(
      atob(encoded.replace(/-/g, "+").replace(/_/g, "/"))
    );
    if (!payload.exp || Date.now() > payload.exp) return false;

    return true;
  } catch {
    return false;
  }
}

// ─── Route Protection Logic ─────────────────────────────────────

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

function isProtectedPath(pathname: string): boolean {
  // Don't protect the login page
  if (
    PUBLIC_ADMIN_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    )
  ) {
    return false;
  }

  // Protect /admin and /api/admin/*
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/api/admin")
  );
}

// ─── Proxy Function ─────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_SESSION_SECRET;

  // Fail-secure: if secret isn't configured, block all admin access
  if (!secret || secret.length < 32) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Authentication not configured." },
        { status: 503 }
      );
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const isValid = await verifyTokenEdge(token, secret);

  if (!isValid) {
    // Clear the invalid/expired cookie and redirect
    const response = pathname.startsWith("/api/")
      ? NextResponse.json({ error: "Session expired." }, { status: 401 })
      : NextResponse.redirect(new URL("/admin/login", request.url));

    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

// ─── Matcher ────────────────────────────────────────────────────

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
