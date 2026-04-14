"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import navbarLinks from "@/app/content/nav.links";
import { logo } from "@/app/content/logo";
import { useTheme } from "@/app/components/common/ThemeProvider";
import { logo2 } from "@/app/content/logo";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isActive(pathname, href) {
  if (!pathname || !href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const links = useMemo(() => navbarLinks ?? [], []);

  const heroRoutes = ["/", "/aboutus", "/gallery", "/donation", "/contactus"];
  const isHeroPage = heroRoutes.includes(pathname);
  const heroMode = isHeroPage && !scrolled;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animation variants
  const menuVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      y: "100%", 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <header
      className={cx(
        "top-1 z-50",
        isHeroPage ? "absolute left-0 right-0" : "sticky",
      )}
    >
      <div
        className={cx(
          "border-b transition",
          scrolled ? "backdrop-blur shadow-sm" : "",
        )}
        style={{
          borderColor: heroMode ? "transparent" : "var(--border)",
          background: heroMode
            ? "transparent"
            : "color-mix(in oklab, var(--surface), transparent 12%)",
        }}
      >
        <nav
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <div className="relative flex h-16 items-center">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo2.src}
                alt={logo.alt || "ALKA"}
                width={100}
                height={100}
                priority
                className="h-11 w-11 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-white shadow-xl object-contain"
                style={{
                  background: "var(--surface-2)",
                  border: heroMode
                    ? "1px solid rgba(255,255,255,0.18)"
                    : "1px solid var(--border)",
                }}
              />
              <div className="hidden sm:block">
                <div
                  className={cx(
                    "font-serif text-2xl leading-tight",
                    heroMode ? "text-white" : "",
                  )}
                >
                  ALKA
                </div>
                <div
                  className="text-xs"
                  style={{
                    color: heroMode
                      ? "rgba(255,255,255,0.75)"
                      : "var(--text-muted)",
                  }}
                >
                  Aware • Learn • Know • Apply
                </div>
              </div>
            </Link>

            {/* Center: Nav links */}
            <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2">
              <ul className="flex items-center gap-1">
                {links.map((l, i) => {
                  const active = isActive(pathname, l.link);
                  return (
                    <li key={i} className="relative">
                      <Link
                        href={l.link}
                        className={cx(
                          "relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition",
                          active
                            ? "text-white"
                            : heroMode
                              ? "hover:bg-white/10"
                              : "hover:bg-black/5",
                        )}
                        style={{
                          color: active
                            ? "white"
                            : heroMode
                              ? "rgba(255,255,255,0.92)"
                              : "var(--text)",
                          background: active
                            ? "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)"
                            : "transparent",
                        }}
                      >
                        {l.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: controls */}
            <div className="ml-auto hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm"
                aria-label="Toggle theme"
                style={{
                  borderColor: heroMode
                    ? "rgba(255,255,255,0.22)"
                    : "var(--border)",
                  background: heroMode
                    ? "rgba(255,255,255,0.10)"
                    : "var(--surface-2)",
                  color: heroMode ? "rgba(255,255,255,0.92)" : "var(--text)",
                }}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

              <Link
                href="/donation"
                className=" text-white inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold  transition hover:-translate-y-0.5 hover:shadow-md active:opacity-90"
                style={{ 
                  background: heroMode
                    ? "rgba(255,255,255,0.18)"
                    : "var(--accent)",
                  border: heroMode
                    ? "1px solid rgba(255,255,255,0.25)"
                    : "none",
                    color: heroMode ? "rgba(255,255,255,0.92)" : "var(--text)",
                }}
              >
                Donate
              </Link>
            </div>

            {/* Mobile: controls */}
            <div className="ml-auto flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 items-center justify-center rounded-xl border px-3"
                aria-label="Toggle theme"
                style={{
                  borderColor: heroMode
                    ? "rgba(255,255,255,0.22)"
                    : "var(--border)",
                  background: heroMode
                    ? "rgba(255,255,255,0.10)"
                    : "var(--surface-2)",
                  color: heroMode ? "rgba(255,255,255,0.92)" : "var(--text)",
                }}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-10 items-center justify-center rounded-xl border px-3 relative"
                aria-label="Open menu"
                style={{
                  borderColor: heroMode
                    ? "rgba(255,255,255,0.22)"
                    : "var(--border)",
                  background: heroMode
                    ? "rgba(255,255,255,0.10)"
                    : "var(--surface-2)",
                }}
              >
                <span className="sr-only">Menu</span>
                <div className="flex flex-col gap-1.5">
                  <span
                    className="h-0.5 w-6 transition-all duration-300"
                    style={{ background: heroMode ? "white" : "var(--text)" }}
                  />
                  <span
                    className="h-0.5 w-6 transition-all duration-300"
                    style={{ background: heroMode ? "white" : "var(--text)" }}
                  />
                  <span
                    className="h-0.5 w-6 transition-all duration-300"
                    style={{ background: heroMode ? "white" : "var(--text)" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Stylish Mobile Sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border shadow-2xl overflow-hidden"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              {/* Decorative header with gradient */}
              <div className="relative h-2 w-full bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--gold)]" />
              
              {/* Pull handle */}
              <div className="flex justify-center pt-4">
                <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-[var(--accent)]/50 to-[var(--primary)]/50" />
              </div>

              {/* Header with logo and close */}
              <div className="flex items-center justify-between px-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full blur opacity-30" />
                    <Image
                      src={logo2.src}
                      alt={logo.alt || "ALKA"}
                      width={40}
                      height={40}
                      className="relative h-10 w-10 rounded-full border-2 border-white shadow-lg object-contain"
                      style={{ background: "var(--surface-2)" }}
                    />
                  </div>
                  <div>
                    <div className="font-serif text-lg font-bold" style={{ color: "var(--text)" }}>
                      ALKA
                    </div>
                    <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      Aware • Learn • Know • Apply
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--surface-2)",
                  }}
                >
                  <span className="text-lg" style={{ color: "var(--text)" }}>✕</span>
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 px-4">
                <div className="text-xs font-semibold uppercase tracking-wider px-2 mb-2" style={{ color: "var(--text-muted)" }}>
                  Menu
                </div>
                <div className="space-y-1">
                  {links.map((l, i) => {
                    const active = isActive(pathname, l.link);
                    return (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={l.link}
                          className={cx(
                            "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold transition-all",
                            active ? "text-white" : "hover:bg-black/5"
                          )}
                          style={
                            active
                              ? { 
                                  background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                                  boxShadow: "0 8px 20px -8px var(--accent)"
                                }
                              : { color: "var(--text)" }
                          }
                          onClick={() => setOpen(false)}
                        >
                          {active && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-2 w-2 rounded-full bg-white"
                            />
                          )}
                          <span className={active ? "flex-1" : "flex-1"}>{l.name}</span>
                          <span className="text-xs opacity-50" style={{ color: active ? "white" : "var(--text-muted)" }}>
                            →
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 px-4">
                <div className="text-xs font-semibold uppercase tracking-wider px-2 mb-2" style={{ color: "var(--text-muted)" }}>
                  Quick Actions
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={toggleTheme}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all hover:bg-black/5"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--surface-2)",
                        color: "var(--text)",
                      }}
                    >
                      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Link
                      href="/donation"
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white transition-all hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                        boxShadow: "0 8px 20px -8px var(--accent)",
                      }}
                      onClick={() => setOpen(false)}
                    >
                      <span>Donate</span>
                      <span>❤️</span>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Social/Footer */}
              <div className="mt-8 px-4 pb-6">
                <div className="flex items-center justify-center gap-4">
                  {["Facebook", "Instagram", "Twitter"].map((social, i) => (
                    <motion.a
                      key={social}
                      href="#"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="text-xs font-medium transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
                <div className="mt-4 text-center text-[10px]" style={{ color: "var(--text-muted)" }}>
                  © 2024 ALKA. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}