"use client";

import React from "react";
import { siteSettings } from "@/lib/data/site-settings";
import { Badge } from "@/components/ui/badge";
import { Check, X, Cpu, TrendingUp, Zap, ShieldCheck } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Cpu,
  TrendingUp,
  Zap,
  ShieldCheck,
};

const COMPARISON_ROWS = [
  {
    feature: "Focus Metric",
    legacy: "Impressions, vanity clicks, traffic rank",
    rankzee: "Qualified Pipeline, Sales Pipeline, High ROAS",
  },
  {
    feature: "Technology Stack",
    legacy: "Outdated WordPress & bloated plugins",
    rankzee: "Next.js App Router, Sub-Second Core Web Vitals",
  },
  {
    feature: "Attribution Setup",
    legacy: "Client-side pixels losing 35% of events",
    rankzee: "Server-to-Server CAPI + GA4 First-Party Data",
  },
  {
    feature: "Reporting & Visibility",
    legacy: "Static monthly PDF sent days late",
    rankzee: "24/7 Live Looker Studio + Direct Slack Pod",
  },
  {
    feature: "Contracts",
    legacy: "Locked-in 12-month handcuffs",
    rankzee: "3-Month Sprints, then Month-to-Month Transparency",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-white dark:bg-slate-900/40 relative border-y border-slate-200 dark:border-white/5 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-[11px]">
            The RankZee Difference
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Why High-Growth Companies <br />
            <span className="text-neon-gradient">Choose RankZee</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Traditional agencies rely on obsolete templates and vanity reports. We approach digital marketing as an algorithmic engineering discipline.
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {siteSettings.whyRankZee.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || TrendingUp;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Direct Side-by-Side Comparison */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/70 backdrop-blur-xl p-6 sm:p-8 overflow-x-auto shadow-xl shadow-slate-200/50 dark:shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white">
              Legacy Agency vs. RankZee Growth Engine
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Clear accountability. Zero fluff.
            </p>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Dimension</th>
                <th className="py-3 px-4 text-slate-400">Typical Agency</th>
                <th className="py-3 px-4 text-blue-600 dark:text-cyan-400 font-bold">RankZee Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-slate-500 dark:text-slate-400 text-xs sm:text-sm flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500/80 shrink-0" />
                    <span>{row.legacy}</span>
                  </td>
                  <td className="py-4 px-4 text-blue-700 dark:text-cyan-300 font-medium text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{row.rankzee}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

