"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-2xl shadow-blue-600/25 border border-blue-500/30">
          {/* Radiant Flares */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/20 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-mono uppercase tracking-wider mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Zero Risk • 48-Hour Domain Reconnaissance</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4 leading-tight">
              Ready to Claim Your <br />
              <span className="text-cyan-200">#1 Ranking on Google?</span>
            </h2>

            <p className="text-blue-100 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl font-normal">
              Stop letting competitors capture your high-intent customers. Book a free 45-minute growth teardown and receive an 80+ point technical SEO & ad waste audit.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/book-consultation" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-slate-100 text-blue-700 font-bold px-8 py-3.5 text-base shadow-xl">
                  <span>Book Free 45-Min Audit</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base text-white border-white/30 hover:bg-white/10 hover:text-white">
                  <span>Talk with a Growth Director</span>
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>No high-pressure sales pitches</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-200" />
                <span>Actionable roadmap you keep regardless</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
