import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/auth";

const apiBaseUrl =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success || !apiBaseUrl) return null;

        const response = await fetch(`${apiBaseUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(parsed.data),
          cache: "no-store",
        });

        if (!response.ok) return null;

        const data = await response.json();
        const user = data?.user;
        const accessToken = data?.accessToken;

        if (!user || !accessToken) return null;

        return {
          id: String(user.id ?? user.AdminUserId ?? ""),
          name: user.fullName ?? user.FullName ?? "Admin",
          email: user.email ?? user.Email ?? parsed.data.email,
          roleName: user.roleName ?? user.RoleName ?? "",
          roleCode: user.roleCode ?? user.RoleCode ?? "",
          isActive: Boolean(user.isActive ?? user.IsActive ?? true),
          accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id ?? "");
        token.name = user.name ?? "";
        token.email = user.email ?? "";
        token.roleName = typeof user.roleName === "string" ? user.roleName : "";
        token.roleCode = typeof user.roleCode === "string" ? user.roleCode : "";
        token.isActive =
          typeof user.isActive === "boolean" ? user.isActive : false;
        token.accessToken =
          typeof user.accessToken === "string" ? user.accessToken : "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.name = typeof token.name === "string" ? token.name : "";
        session.user.email = typeof token.email === "string" ? token.email : "";
        session.user.roleName =
          typeof token.roleName === "string" ? token.roleName : "";
        session.user.roleCode =
          typeof token.roleCode === "string" ? token.roleCode : "";
        session.user.isActive =
          typeof token.isActive === "boolean" ? token.isActive : false;
        session.user.accessToken =
          typeof token.accessToken === "string" ? token.accessToken : "";
      }
      return session;
    },
  },
});