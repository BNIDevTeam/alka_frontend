"use client";
import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
export default function LogoutButton({
  variant = "button",
}: {
  variant?: "button" | "menu-item";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: "/login" });
    } finally {
      setIsLoading(false);
    }
  };
  if (variant === "menu-item")
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="h-4 w-4" />
        )}{" "}
        Logout
      </button>
    );
  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}{" "}
      Logout
    </button>

    
  );
}
