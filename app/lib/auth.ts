/**
 * Admin Authentication Utilities
 *
 * Single-owner session management using HMAC-signed cookies.
 * No external dependencies — uses Node.js crypto module.
 */

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, randomBytes } from "crypto";

// ─── Constants ──────────────────────────────────────────────────

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── Internal Helpers ───────────────────────────────────────────

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set in .env.local (min 32 characters)."
    );
  }
  return secret;
}

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD must be set in .env.local.");
  }
  return password;
}

/** Creates an HMAC-SHA256 signature for a payload. */
function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** Builds the token: base64(payload).signature */
function createToken(): string {
  const payload = JSON.stringify({
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION_MS,
    nonce: randomBytes(8).toString("hex"),
  });

  const encoded = Buffer.from(payload).toString("base64url");
  const signature = sign(encoded);

  return `${encoded}.${signature}`;
}

/** Verifies token integrity and expiry. Returns true if valid. */
function verifyToken(token: string): boolean {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;

    // Verify signature
    const expectedSig = sign(encoded);
    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSig, "hex");

    if (sigBuffer.length !== expectedBuffer.length) return false;
    if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

    // Verify expiry
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf-8")
    );

    if (!payload.exp || Date.now() > payload.exp) return false;

    return true;
  } catch {
    return false;
  }
}

// ─── Public API ─────────────────────────────────────────────────

/**
 * Validates the admin password using timing-safe comparison.
 * Returns true if the password matches.
 */
export function validatePassword(input: string): boolean {
  const expected = getAdminPassword();

  // Normalize to buffers for timing-safe comparison
  const inputBuffer = Buffer.from(input.normalize("NFC"));
  const expectedBuffer = Buffer.from(expected.normalize("NFC"));

  // If lengths differ, still do a comparison to prevent timing leaks
  if (inputBuffer.length !== expectedBuffer.length) {
    const padded = Buffer.alloc(expectedBuffer.length);
    inputBuffer.copy(padded);
    timingSafeEqual(padded, expectedBuffer);
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}

/**
 * Creates an authenticated session by setting an HTTP-only cookie.
 * Call this after successful password validation.
 */
export async function createSession(): Promise<void> {
  const token = createToken();
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: Math.floor(SESSION_DURATION_MS / 1000),
  });
}

/**
 * Destroys the current session by clearing the cookie.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Checks if the current request has a valid admin session.
 * Use in server actions/components to gate access.
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyToken(token);
  } catch {
    return false;
  }
}

/**
 * Guard function for server actions. Throws if not authenticated.
 * Use at the top of any sensitive server action.
 */
export async function requireAuth(): Promise<void> {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error("Unauthorized. Please log in.");
  }
}

/**
 * Verifies a raw token string (used by middleware where cookies()
 * helper is not available).
 */
export function verifySessionToken(token: string): boolean {
  return verifyToken(token);
}

/** Export cookie name for use in middleware */
export const SESSION_COOKIE_NAME = COOKIE_NAME;
