"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { loginSchema } from "@/lib/validations/auth";

export async function loginAction(formData: FormData) {
  const rawData = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  };

  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    redirect("/login?error=validation");
  }

  try {
    const result = await signIn("credentials", {
      ...parsed.data,
      redirect: false,
    });

    if (result?.error) {
      redirect("/login?error=invalid");
    }
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=invalid");
    }

    redirect("/login?error=invalid");
  }

  redirect("/admin/dashboard");
}