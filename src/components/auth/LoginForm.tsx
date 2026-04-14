"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/app/(auth)/login/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:scale-100"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          <>
            Sign In
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </>
        )}
      </span>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={loginAction} className="space-y-6">
      <div className="group">
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors group-focus-within:text-blue-600"
        >
          Email Address
        </label>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@alka.com"
            autoComplete="email"
            className="w-full rounded-xl border border-gray-200 bg-white/50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors group-focus-within:text-blue-600"
        >
          Password
        </label>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4V8a4 4 0 00-8 0v3h8z"
              />
            </svg>
          </div>

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full rounded-xl border border-gray-200 bg-white/50 py-3 pl-10 pr-12 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton />
    </form>
  );
}