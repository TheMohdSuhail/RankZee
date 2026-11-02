import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { samplePortfolio } from "@/lib/data/sample-portfolio";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Case Studies & Verified Results | 480% Organic Traffic, 5.2x ROAS",
  description: "Explore in-depth case studies of how RankZee scales B2B, FinTech, and D2C brands with data-backed SEO and high-velocity paid acquisition.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-xs">
            Demonstrated ROI
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Growth Stories & <br />
            <span className="text-neon-gradient">Verifiable Outcomes</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            We hold ourselves accountable to bottom-line pipeline metrics. Discover how we solve complex algorithmic bottlenecks for category leaders.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {samplePortfolio.map((caseStudy) => (
            <div
              key={caseStudy.slug}
              className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 overflow-hidden hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
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

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-3 font-semibold">
                    <span>{caseStudy.client}</span>
                    <span>{caseStudy.industry}</span>
                  </div>

                  <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                    {caseStudy.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {caseStudy.summary}
                  </p>

                  {/* Highlight Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    {caseStudy.metrics.map((m, i) => (
                      <div key={i} className="text-center sm:text-left">
                        <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-cyan-400 leading-none mb-1 font-heading">{m.value}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <Link
                    href={`/portfolio/${caseStudy.slug}`}
                    className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 group/btn"
                  >
                    <span>Read Complete Engineering Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
