"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { samplePortfolio } from "@/lib/data/sample-portfolio";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export function PortfolioPreview() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Badge variant="default" className="mb-3 uppercase tracking-wider text-[11px]">
              Verifiable Track Record
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured <span className="text-neon-gradient">Case Studies</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 max-w-xl">
              Real brands. Real algorithmic challenges. Real pipeline revenue generated.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors group"
          >
            <span>View All Client Stories</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {samplePortfolio.map((caseStudy) => (
            <div
              key={caseStudy.slug}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 overflow-hidden hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Image
                  src={caseStudy.images[0]}
                  alt={caseStudy.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="backdrop-blur-md bg-white/90 text-blue-700 dark:bg-slate-950/80 dark:text-cyan-300 border-slate-200 dark:border-cyan-500/30">
                    {caseStudy.category}
                  </Badge>
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                    {caseStudy.client} • {caseStudy.industry}
                  </p>
                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                    {caseStudy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {caseStudy.summary}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
                    {caseStudy.metrics.slice(0, 2).map((m, i) => (
                      <div key={i}>
                        <p className="text-lg font-bold text-blue-600 dark:text-cyan-300">{m.value}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <Link
                    href={`/portfolio/${caseStudy.slug}`}
                    className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 group/btn"
                  >
                    <span>Read Full Breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

