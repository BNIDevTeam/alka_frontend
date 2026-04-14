import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

function getErrorState(error?: string) {
  if (error === "validation") {
    return {
      message: "Please enter a valid email and password.",
      type: "validation" as const,
    };
  }

  if (error === "invalid") {
    return {
      message: "Invalid email or password.",
      type: "invalid" as const,
    };
  }

  return {
    message: "",
    type: "",
  };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const { message: errorMessage, type: errorType } = getErrorState(params.error);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-orange-200/30 blur-3xl delay-1000" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl animate-fadeInUp">
          <div className="overflow-hidden rounded-2xl bg-white/80 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-3xl sm:rounded-3xl">
            <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
              <div className="relative flex items-center bg-gradient-to-br from-white via-white to-blue-50/30 p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="absolute left-0 top-0 h-32 w-32 rounded-br-[100px] bg-gradient-to-br from-blue-500/10 to-orange-500/10" />
                <div className="absolute bottom-0 right-0 h-32 w-32 rounded-tl-[100px] bg-gradient-to-tl from-blue-500/10 to-orange-500/10" />

                <div className="relative z-10 mx-auto w-full max-w-md">
                  <div className="mb-8 text-center sm:mb-10 md:mb-12">
                    <div className="inline-flex items-center justify-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg sm:h-16 sm:w-16">
                        <Image
                          src="/images/alka_logo.png"
                          alt="ALKA Logo"
                          width={40}
                          height={40}
                          className="h-10 w-10 object-contain brightness-0 invert sm:h-12 sm:w-12"
                        />
                      </div>
                      <div>
                        <h1 className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                          ALKA Admin
                        </h1>
                        <p className="mt-0.5 text-xs text-gray-500">
                          Admin Dashboard
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 text-center">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      Welcome Back
                    </h2>
                    <p className="text-sm text-gray-600">
                      Sign in to access your admin dashboard
                    </p>
                  </div>

                  {errorMessage ? (
                    <div
                      role="alert"
                      className={`mb-6 rounded-xl border px-4 py-3 text-sm animate-slideIn ${
                        errorType === "invalid"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-yellow-200 bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  ) : null}

                  <LoginForm />

                  <div className="mt-8 border-t border-gray-100 pt-6 text-center">
                    <p className="text-xs text-gray-500">
                      © 2024 ALKA Foundation. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-8 lg:flex lg:p-12">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute left-0 top-0 h-64 w-64 animate-blob rounded-full bg-white blur-3xl" />
                  <div className="animation-delay-2000 absolute bottom-0 right-0 h-64 w-64 animate-blob rounded-full bg-orange-300 blur-3xl" />
                  <div className="animation-delay-4000 absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-blue-300 blur-3xl" />
                </div>

                <div className="relative z-10 text-center text-white">
                  <div className="mb-8 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <Image
                        src="/images/alka_logo.png"
                        alt="ALKA Logo"
                        width={60}
                        height={60}
                        className="h-14 w-14 object-contain brightness-0 invert"
                      />
                    </div>
                  </div>

                  <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                    Admin Dashboard
                  </h2>

                  <p className="mx-auto mb-8 max-w-md text-base text-blue-100 lg:text-lg">
                    Manage campaigns, volunteers, donations, and more from a
                    single, intuitive interface.
                  </p>

                  <div className="mx-auto grid max-w-sm grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-xs text-blue-200">Campaigns</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold">1000+</div>
                      <div className="text-xs text-blue-200">Volunteers</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-xs text-blue-200">Donors</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold">₹2Cr+</div>
                      <div className="text-xs text-blue-200">Raised</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}