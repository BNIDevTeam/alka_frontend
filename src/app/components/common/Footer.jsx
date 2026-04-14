"use client";

import Link from "next/link";
import { logo } from "@/app/content/logo";
import footerContent from "@/app/content/footer";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  House,
  Info,
  Image as ImageIcon,
  HandHeart,
  Contact,
} from "lucide-react";

import AnimatedTagline from "./AnimatedTagline";

function SocialIcon({ item }) {
  const t = String(item?.icon || item?.name || "")
    .trim()
    .toLowerCase();

  const cls = "block h-5 w-5 transition-transform group-hover:scale-110";

  if (item?.svg) {
    return (
      <span
        className="block h-5 w-5 transition-transform group-hover:scale-110"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: item.svg }}
      />
    );
  }

  switch (t) {
    case "facebook":
    case "fb":
    case "facebook-f":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H18l-.5 3h-2.6v7A10 10 0 0 0 22 12z" />
        </svg>
      );

    case "instagram":
    case "insta":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5zM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8z" />
        </svg>
      );

    case "youtube":
    case "yt":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.8 31.8 0 0 0 2 12a31.8 31.8 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 22 12a31.8 31.8 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
        </svg>
      );

    case "linkedin":
    case "linkedin-in":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.94 6.5A2.44 2.44 0 1 1 7 1.62a2.44 2.44 0 0 1-.06 4.88zM2.5 22h4.9V8.5H2.5V22zM9.1 8.5H14v1.85h.07c.68-1.29 2.34-2.65 4.82-2.65 5.15 0 6.11 3.39 6.11 7.8V22h-4.9v-5.77c0-1.38-.02-3.15-1.92-3.15-1.92 0-2.21 1.5-2.21 3.05V22H9.1V8.5z" />
        </svg>
      );

    default:
      return (
        <span
          className="block h-2 w-2 rounded-full bg-white/70"
          aria-hidden="true"
        />
      );
  }
}

export default function FooterSection() {
  const { brand, contact, social, legal } = footerContent;

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] opacity-5 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-5 blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <AnimatedTagline />

      {/* Main Footer Content - Increased width, reduced padding */}
      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-12">
        {/* Top Grid - 3 columns */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Brand Column - 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            <Link href={brand?.link || "/"} className="inline-block group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] opacity-0 blur-md transition-opacity group-hover:opacity-50" />
                <img
                  src={logo.src}
                  alt="ALKA"
                  className="relative h-16 w-16 rounded-xl object-contain bg-white/5 backdrop-blur-sm border border-white/10"
                />
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {brand?.description || ""}
            </p>

            {/* Social Icons - Smaller */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {(social || []).map((s) => (
                <a
                  key={s.name || s.link}
                  href={s.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name || "social"}
                  className="group inline-grid h-12 w-12 place-items-center rounded-lg transition-all hover:bg-white/10 hover:-translate-y-0.5"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <SocialIcon item={s} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold text-white/90">
              Quick Links
            </h4>

            <ul className="space-y-2.5 pt-5">
              {[
                { href: "/", label: "Home", icon: House },
                { href: "/aboutus", label: "About Us", icon: Info },
                { href: "/gallery", label: "Gallery", icon: ImageIcon },
                { href: "/donation", label: "Donate", icon: HandHeart },
                { href: "/contactus", label: "Contact Us", icon: Contact },
              ].map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm transition-all hover:translate-x-1"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:scale-110 ]"
                        style={{ color: "#ffffff" }}
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Cards - 6 cols */}
          <div className="lg:col-span-6">
            <h4 className="text-sm font-semibold text-white/90 mb-4 pb-5">
              Get in Touch
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone Card */}
              <a
                href={`tel:${contact?.phone || ""}`}
                className="group flex items-start gap-3 rounded-xl p-3.5 transition-all hover:-translate-y-0.5 hover:bg-white/5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] shrink-0">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-white/50">Phone</div>
                  <div
                    className="text-sm truncate"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {contact?.phone || ""}
                  </div>
                </div>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: "var(--accent)" }}
                />
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${contact?.email || ""}`}
                className="group flex items-start gap-3 rounded-xl p-3.5 transition-all hover:-translate-y-0.5 hover:bg-white/5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-white/50">Email</div>
                  <div
                    className="text-sm truncate"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {contact?.email || ""}
                  </div>
                </div>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: "var(--primary)" }}
                />
              </a>

              {/* Registered Address - Full width */}
              <div
                className="sm:col-span-2 flex items-start gap-3 rounded-xl p-3.5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-white/50">
                    Registration Address
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {contact?.registeredAddress || ""}
                  </p>
                </div>
              </div>

              {/* Operating Address - Full width */}
              <div
                className="sm:col-span-2 flex items-start gap-3 rounded-xl p-3.5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-white/50">
                    Operating Address
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {contact?.operatingAddress || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Reduced height */}
        <div
          className="mt-10 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {legal?.copyright || ""}
          </p>

          {/* <div
            className="flex items-center gap-3 text-xs"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span>
              Built with{" "}
              <Heart
                className="inline h-3 w-3"
                style={{ color: "var(--accent)" }}
              />{" "}
              for impact
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
