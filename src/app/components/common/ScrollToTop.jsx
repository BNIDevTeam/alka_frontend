"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 350);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-6 right-6 z-[90]",
        "h-12 w-12 rounded-2xl",
        "grid place-items-center group",
        "border shadow-lg",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        "focus:outline-none focus-visible:ring-2",
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
      style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
              color: "white",
              boxShadow: "0 8px 20px -8px var(--accent)"
            }}
    >
      {/* arrow with hover animation */}
      <span className="relative block h-5 w-5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="absolute inset-0 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          <path
            d="M12 19V5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M6.5 10.5L12 5l5.5 5.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* hover ring */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--accent), transparent 40%)" }}
      />
    </button>
  );
}
