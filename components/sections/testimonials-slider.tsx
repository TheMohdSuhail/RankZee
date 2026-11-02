"use client";

import React from "react";
import Image from "next/image";
import { sampleTestimonials } from "@/lib/data/sample-testimonials";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export function TestimonialsSlider() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40 relative border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-[11px]">
            Client Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Trusted by Ambitious <span className="text-neon-gradient">Market Leaders</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            See what founders, VPs of Marketing, and Chief Revenue Officers say about partnering with RankZee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between relative group shadow-sm hover:shadow-md"
            >
              <Quote className="w-8 h-8 text-blue-500/15 dark:text-cyan-400/20 absolute top-6 right-6" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">{t.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.role}, {t.company}</p>
                  </div>
                </div>

                {t.metric && (
                  <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200 dark:bg-slate-900 dark:text-cyan-300 dark:border-cyan-500/30">
                    {t.metric}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

