"use client";

import React from "react";
import Link from "next/link";
import { Service3DCard } from "@/components/three/service-3d-card";
import { sampleServices } from "@/lib/data/sample-services";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function ServicesOverview() {
  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
      {/* Background neon ambient spots */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-[11px]">
            Comprehensive Growth Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Engineered for <span className="text-neon-gradient">Revenue & Scale</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            No cookie-cutter packages. Every service is a fine-tuned engine built to eliminate marketing waste and capture market leadership.
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sampleServices.map((service) => (
            <Service3DCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors group"
          >
            <span>View detailed deliverables and custom scope options</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

