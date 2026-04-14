"use client";

import { useState } from "react";
import { Lock, KeyRound, AlertCircle } from "lucide-react";
import { changeMyPasswordAction } from "@/app/(admin)/admin/profile/action";
import PasswordField from "@/components/admin/PasswordField";

export default function ChangePasswordForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const currentPassword = String(formData.get("currentPassword") || "").trim();
    const newPassword = String(formData.get("newPassword") || "").trim();
    const confirmPassword = String(formData.get("confirmPassword") || "").trim();

    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match.");
      return;
    }

    try {
      setPending(true);
      await changeMyPasswordAction(formData);
      form.reset();
    } catch {
      setError("Unable to update password. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <PasswordField
        label="Current Password"
        name="currentPassword"
        placeholder="Enter current password"
        icon={<KeyRound className="h-4 w-4" />}
      />

      <PasswordField
        label="New Password"
        name="newPassword"
        placeholder="Enter new password"
        icon={<Lock className="h-4 w-4" />}
      />

      <PasswordField
        label="Confirm New Password"
        name="confirmPassword"
        placeholder="Confirm new password"
        icon={<Lock className="h-4 w-4" />}
      />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Lock className="h-4 w-4" />
        {pending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}