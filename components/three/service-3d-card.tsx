"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceItem } from "@/lib/data/sample-services";
import * as Icons from "lucide-react";

export function Service3DCard({ service }: { service: ServiceItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt calculation (capped at 12 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  // Dynamically resolve icon from lucide-react safely
  const IconComponent = (Icons as any)[service.icon] || Icons.Sparkles;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl p-[1px] bg-gradient-to-b from-slate-200 via-slate-100 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent transition-transform duration-200 ease-out h-full"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative h-full flex flex-col justify-between p-7 rounded-[15px] bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/5 overflow-hidden group shadow-lg shadow-slate-200/60 dark:shadow-none">
        {/* Dynamic Specular Glare Highlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 250px at ${glare.x}% ${glare.y}%, rgba(59, 130, 246, ${glare.opacity}), transparent)`,
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 dark:group-hover:bg-cyan-500/20 transition-colors" />

        <div>
          {/* Service Icon with Glow */}
          <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-gradient-to-tr dark:from-blue-600/20 dark:via-violet-600/20 dark:to-cyan-500/20 border border-blue-200/70 dark:border-white/10 flex items-center justify-center mb-6 text-blue-600 dark:text-cyan-400 group-hover:scale-105 transition-all duration-300 shadow-sm">
            <IconComponent className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
            {service.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {service.shortDesc}
          </p>

          {/* Key Features Bullet Pills */}
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 mr-2.5 shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore Service CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <Link
            href={`/services/${service.slug}`}
            className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1.5 group/link"
          >
            <span>Explore Service & Deliverables</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

