import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMyProfile } from "@/lib/api/admin";
import { changeMyPasswordAction, updateMyProfileAction } from "./action";

import {
  User,
  Mail,
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Save,
  KeyRound,
} from "lucide-react";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

type ProfilePageProps = {
  searchParams?: Promise<{
    success?: string;
    error?: string;
  }>;
};

function successMessage(value?: string): string {
  if (value === "profile-updated") return "Profile updated successfully.";
  if (value === "password-updated") return "Password updated successfully.";
  return "";
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const params = (await searchParams) ?? {};
  const profile = await getMyProfile(Number(session.user.id));

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 px-6 py-4 text-white shadow-xl">
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">My Profile</h1>
            <p className="mt-0.5 text-xs text-blue-100">
              Update your account details and password
            </p>
          </div>
        </div>
      </div>

      {params.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>{successMessage(params.success)}</span>
          </div>
        </div>
      )}

      {params.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{params.error}</span>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Profile Information
            </h2>
          </div>

          <form action={updateMyProfileAction} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  defaultValue={profile.fullName}
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-3 py-3 text-sm outline-none transition focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  defaultValue={profile.email}
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-3 py-3 text-sm outline-none transition focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Shield className="h-4 w-4 text-slate-500" />
                  Role
                </div>
                <p className="text-sm text-slate-600">{profile.roleName}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Shield className="h-4 w-4 text-slate-500" />
                  Status
                </div>
                <p className="text-sm text-slate-600">
                  {profile.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Save Profile
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center gap-2">
            <Lock className="h-5 w-5 text-rose-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Change Password
            </h2>
          </div>

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
