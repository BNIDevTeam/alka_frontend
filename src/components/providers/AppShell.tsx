"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/common/Navbar";
import FooterSection from "@/app/components/common/Footer";
import ScrollToTop from "@/app/components/common/ScrollToTop";
import { ThemeProvider } from "@/app/components/common/ThemeProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/login" || pathname.startsWith("/admin");

  return (
    <ThemeProvider>
      {!isAdminRoute ? <Navbar /> : null}
      <main>{children}</main>
      {!isAdminRoute ? <FooterSection /> : null}
      {!isAdminRoute ? <ScrollToTop /> : null}
    </ThemeProvider>
  );
}
