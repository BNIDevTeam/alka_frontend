"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      href: "/admin/campaigns",
      label: "Campaigns",
      icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    },
    {
      href: "/admin/donors",
      label: "Donors",
      icon: "M17 20h5V4H2v16h5m10 0v-2c0-2.761-2.239-5-5-5s-5 2.239-5 5v2m10 0H7m5-9a3 3 0 100-6 3 3 0 000 6z",
    },
    {
      href: "/admin/donations",
      label: "Donations",
      icon: "M12 8c-2.21 0-4 .895-4 2s1.79 2 4 2 4 .895 4 2-1.79 2-4 2m0-8c1.11 0 2.08.228 2.772.587M12 8V6m0 2v8m0 0v2m0-2c-1.11 0-2.08-.228-2.772-.587",
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    },
    
  ];
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);
  return (
    <aside className="relative flex h-full min-h-screen flex-col bg-gradient-to-b from-white to-slate-50 shadow-xl">
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white-900 to-gray-300 shadow-xl">
              <Image
                src="/images/alka_logo.png"
                alt="ALKA Logo"
                width={140}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </div>
            <div>
              <h2 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                ALKA Admin
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Alka Website Management
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 lg:hidden"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5 sm:px-4 sm:py-6">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={[
                "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")}
            >
              {active ? (
                <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-500 to-blue-600" />
              ) : null}
              <svg
                className={[
                  "h-5 w-5",
                  active
                    ? "text-blue-600"
                    : "text-slate-400 group-hover:text-slate-600",
                ].join(" ")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={item.icon}
                />
              </svg>
              <span className="flex-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <Link
          href="/donation"
          className="block rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
        >
          <p className="text-xs font-semibold text-blue-900">
            Support Our Cause
          </p>
          <p className="mt-1 text-xs text-blue-700">
            Help us make a difference
          </p>
          <div className="mt-2 inline-flex rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white">
            Donate Now
          </div>
        </Link>
      </div>
    </aside>
  );
}
