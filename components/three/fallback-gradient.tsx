import React from "react";

export function FallbackGradient({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Deep Cyber Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950" />

      {/* Radiant Glowing Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-purple-600/25 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/3 left-1/2 w-72 h-72 rounded-full bg-cyan-400/20 blur-[90px] animate-pulse-glow" />

      {/* Cyber Perspective Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 245, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}

