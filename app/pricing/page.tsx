import React from "react";
import { Metadata } from "next";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Growth Packages & Service Scope | RankZee Digital Marketing",
  description: "Transparent, monthly growth packages with zero hidden fees. Compare Starter, Growth, and Premium service scopes by RankZee.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="pt-28 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-xs">
            Simple, Transparent Terms
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Invest in <span className="text-neon-gradient">Compounding Revenue</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            No convoluted retainers or hidden markups. Straightforward monthly service scopes engineered for high-growth brands.
          </p>
        </div>

        {/* Pricing component */}
        <PricingPreview />

        {/* FAQ section */}
        <FAQAccordion />
      </div>
    </div>
  );
}
