import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showTagline = false, size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? "w-7 h-7" : size === "lg" ? "w-11 h-11" : "w-9 h-9";
  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Dynamic Rank Icon */}
      <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-violet-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300`}>
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f5ff_1px,transparent_1px)] [background-size:6px_6px] opacity-20" />
          
          {/* Upward Growth / Rank #1 Vector */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-cyan-400 group-hover:scale-110 group-hover:text-white transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Growth Bars & Arrow */}
            <path d="M4 19h16" />
            <path d="M6 15l4-4 3 3 5-7" />
            <path d="M14 7h4v4" />
          </svg>
        </div>
      </div>

      {/* Brand Name */}
      <div className="flex flex-col">
        <span className={`font-heading font-extrabold tracking-tight ${textSize} text-slate-900 dark:text-white flex items-center gap-1`}>
          Rank<span className="text-neon-gradient">Zee</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse inline-block ml-0.5" />
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400 -mt-1 font-semibold">
            Digital Marketing
          </span>
        )}
      </div>
    </Link>
  );
}

