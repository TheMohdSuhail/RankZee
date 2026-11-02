"use client";

import React from "react";
import { siteSettings } from "@/lib/data/site-settings";

export function StatsCounter() {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 border-y border-slate-200 dark:border-white/5 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10">
          {siteSettings.stats.map((stat, idx) => (
            <div key={idx} className={`pt-6 md:pt-0 ${idx > 0 ? "md:pl-8" : ""}`}>
              <div className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                <span className="text-neon-gradient">{stat.value}</span>
                <span className="text-blue-600 dark:text-cyan-400 font-bold ml-1">{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

