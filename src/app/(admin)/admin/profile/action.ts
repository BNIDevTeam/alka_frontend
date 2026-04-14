"use server";

import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { changeMyPassword, updateMyProfile } from "@/lib/api/admin";

function getErrorMessage(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || "Invalid form data";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

export async function updateMyProfileAction(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    await updateMyProfile({
      adminUserId: Number(session.user.id),
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
    });
  } catch (error) {
    redirect(`/admin/profile?error=${encodeURIComponent(getErrorMessage(error))}`);
  }

  revalidatePath("/admin/profile");
  redirect("/admin/profile?success=profile-updated");
}

export async function changeMyPasswordAction(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    await changeMyPassword({
      adminUserId: Number(session.user.id),
      currentPassword: String(formData.get("currentPassword") || ""),
      newPassword: String(formData.get("newPassword") || ""),
      confirmPassword: String(formData.get("confirmPassword") || ""),
    });
  } catch (error) {
    redirect(`/admin/profile?error=${encodeURIComponent(getErrorMessage(error))}`);
  }

  revalidatePath("/admin/profile");
  redirect("/admin/profile?success=password-updated");
}