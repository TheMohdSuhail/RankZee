import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { sampleServices } from "@/lib/data/sample-services";
import { Service3DCard } from "@/components/three/service-3d-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing & Growth Services | Technical SEO, PPC, Meta Ads",
  description: "Explore RankZee's full suite of high-performance digital marketing solutions: SEO, Google Ads, Meta Ads, Next.js Development, and CRO.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-xs">
            Full-Spectrum Digital Dominance
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Algorithmic Solutions for <br />
            <span className="text-neon-gradient">Compounding Revenue</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Every capability is engineered to dominate its respective channel—from organic search engine real estate to algorithmic paid social scaling and conversion-optimized Jamstack code.
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {sampleServices.map((service) => (
            <Service3DCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Methodology Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 mb-20 shadow-sm">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-3">
              Standard Service SLA & Guarantees
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Across every engagement, our agency maintains uncompromising standards of delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dedicated Strategy Pod</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct access to your Growth Director, SEO Architect, and Copy Lead via a shared private Slack channel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-purple-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Live 24/7 Looker Studio</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Transparent real-time metrics showing exact spend, cost-per-acquisition, keyword climbs, and pipeline value.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Long-Term Lock-in</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                After the initial 90-day sprint, retain us on a month-to-month cadence with a straightforward 30-day notice period.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Scope CTA */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white mb-3">
            Need a tailored multi-channel growth combination?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto mb-6">
            We regularly formulate bespoke combinations for funded startups and mid-market enterprises.
          </p>
          <Link href="/book-consultation">
            <Button size="lg" className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
              <span>Request Custom Scope Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
