"use client";

import { useActionState } from "react";
import { ShieldCheck, Lock, Loader2, AlertTriangle } from "lucide-react";
import { login, type AuthResult } from "../../actions/auth";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(
    login,
    null
  );

  return (
    <div className="min-h-screen bg-[#F5F6F1] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1F3D8C] rounded-xs mb-4">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#12151B]">
            Admin Access
          </h1>
          <p className="font-body text-sm text-[#585D67] mt-1.5">
            WebifyIt Control Room
          </p>
        </div>

        {/* Login Form */}
        <form
          action={formAction}
          className="bg-white border border-[#C7C9C0] rounded-xs p-6 shadow-3d space-y-5"
        >
          {/* Error message */}
          {state?.error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span className="font-body text-sm text-red-800 font-medium">
                {state.error}
              </span>
            </div>
          )}

          {/* Password input */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="font-mono text-xs font-bold text-[#12151B] uppercase tracking-wider"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8E96]" />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                autoFocus
                disabled={isPending}
                className="w-full bg-[#F5F6F1] border border-[#C7C9C0] pl-10 pr-4 py-3 rounded-xs font-body text-sm text-[#12151B] focus:border-[#1F3D8C] focus:outline-none disabled:opacity-60 placeholder:text-[#8A8E96]"
                placeholder="Enter admin password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full btn-primary text-sm py-3 flex items-center justify-center gap-2 font-bold"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>

          {/* Footer note */}
          <p className="font-mono text-[10px] text-[#8A8E96] text-center uppercase tracking-wider">
            Session expires after 7 days
          </p>
        </form>
      </div>
    </div>
  );
}
