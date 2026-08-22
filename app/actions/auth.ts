"use server";

import { redirect } from "next/navigation";
import {
  validatePassword,
  createSession,
  destroySession,
} from "../lib/auth";

// ─── Types ──────────────────────────────────────────────────────

export type AuthResult = {
  success: boolean;
  error?: string;
};

// ─── Login ──────────────────────────────────────────────────────

export async function login(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const password = formData.get("password");

  if (!password || typeof password !== "string") {
    return { success: false, error: "Password is required." };
  }

  if (password.length > 256) {
    return { success: false, error: "Invalid password." };
  }

  const isValid = validatePassword(password);

  if (!isValid) {
    // Intentionally vague error to not reveal password existence
    return { success: false, error: "Invalid credentials." };
  }

  await createSession();
  redirect("/admin");
}

// ─── Logout ─────────────────────────────────────────────────────

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
