"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 ${className}`} />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center justify-center ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-600" />
      )}
    </button>
  );
}

