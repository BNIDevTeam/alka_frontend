"use client";

import { useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  icon?: ReactNode;
};

export default function PasswordField({
  label,
  name,
  placeholder,
  icon,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {icon ? (
          <div className="pointer-events-none absolute left-3 top-3.5 text-gray-400">
            {icon}
          </div>
        ) : null}

        <input
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-blue-500"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}