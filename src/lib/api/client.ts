// import { auth } from "@/auth";

// const apiBaseUrl =
//   process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

// type FetchOptions = RequestInit & {
//   searchParams?: Record<string, string | number | boolean | undefined | null>;
//   authRequired?: boolean;
// };

// export async function apiFetch<T>(
//   path: string,
//   options: FetchOptions = {},
// ): Promise<T> {
//   if (!apiBaseUrl) throw new Error("API_BASE_URL is not configured");
//   const url = new URL(`${apiBaseUrl}${path}`);
//   if (options.searchParams) {
//     for (const [key, value] of Object.entries(options.searchParams)) {
//       if (value !== undefined && value !== null && value !== "")
//         url.searchParams.set(key, String(value));
//     }
//   }
//   const headers = new Headers(options.headers || {});
//   headers.set("Accept", "application/json");
//   if (
//     options.body &&
//     !headers.has("Content-Type") &&
//     !(options.body instanceof FormData)
//   )
//     headers.set("Content-Type", "application/json");
//   if (options.authRequired !== false) {
//     const session = await auth();
//     console.log("SESSION_IN_APIFETCH", session);

//     const accessToken = session?.user?.accessToken;
//     console.log("ACCESS_TOKEN_IN_APIFETCH", accessToken);

//     if (!accessToken) throw new Error("Unauthorized");

//     headers.set("Authorization", `Bearer ${accessToken}`);
//     console.log("AUTH_HEADER_SET", `Bearer ${accessToken}`);
//   }
//   const response = await fetch(url.toString(), {
//     ...options,
//     headers,
//     cache: options.cache || "no-store",
//   });
//   if (!response.ok) {
//     let message = `Request failed with status ${response.status}`;
//     try {
//       const errorData = await response.json();
//       message = errorData.message || errorData.error || message;
//     } catch {}
//     throw new Error(message);
//   }
//   if (response.status === 204) return undefined as T;
//   return response.json() as Promise<T>;
// }

// export async function publicApiFetch<T>(
//   path: string,
//   options: FetchOptions = {},
// ): Promise<T> {
//   return apiFetch<T>(path, { ...options, authRequired: false });
// }
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const apiBaseUrl =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

type FetchOptions = RequestInit & {
  searchParams?: Record<string, string | number | boolean | undefined | null>;
  authRequired?: boolean;
};

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }

  const base = apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${cleanPath}`);

  if (options.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  if (
    options.body &&
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (options.authRequired !== false) {
    const session = await auth();
    const accessToken = session?.user?.accessToken;

    if (!session?.user?.id || !accessToken) {
      redirect("/login");
    }

    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers,
    cache: options.cache || "no-store",
  });

  if (response.status === 401) {
    redirect("/login");
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();
      message = errorData.message || errorData.error || message;
    } catch {}

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function publicApiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  return apiFetch<T>(path, { ...options, authRequired: false });
}