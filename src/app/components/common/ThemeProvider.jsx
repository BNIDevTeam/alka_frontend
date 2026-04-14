"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

function applyTheme(theme) {
  const root = document.documentElement; // <html>
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.setAttribute("data-theme", "light");
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load saved theme if exists, else follow system (no attribute set)
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;

    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      applyTheme(saved);
      return;
    }

    // Default: follow system preference (no data-theme attribute)
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const initial = prefersDark ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const value = useMemo(() => {
    return {
      theme,
      setTheme: (t) => {
        setTheme(t);
        applyTheme(t);
        localStorage.setItem("theme", t);
      },
      toggleTheme: () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
        localStorage.setItem("theme", next);
      },
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
