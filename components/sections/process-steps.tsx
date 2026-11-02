"use client";

import React from "react";
import { siteSettings } from "@/lib/data/site-settings";
import { Badge } from "@/components/ui/badge";

export function ProcessSteps() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-[11px]">
            Systematic Methodology
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            How We Take You to <span className="text-neon-gradient">#1 Position</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A battle-tested 4-step framework engineered to eliminate guesswork and systematically compound marketing ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {siteSettings.processSteps.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                <span className="font-mono text-4xl sm:text-5xl font-extrabold text-slate-200 dark:text-white/10 group-hover:text-blue-500/40 dark:group-hover:text-cyan-400/30 transition-colors block mb-4">
                  {item.step}
                </span>

                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center text-xs font-mono text-blue-600 dark:text-cyan-400 font-semibold">
                <span>Phase {item.step} Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

