"use client";

import React, { useState } from "react";
import { siteSettings } from "@/lib/data/site-settings";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { StructuredData } from "@/components/seo/structured-data";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-white/5 relative transition-colors">
      <StructuredData type="FAQPage" data={{ faqs: siteSettings.faqs }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-[11px]">
            Frequently Answered
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Everything You Need <span className="text-neon-gradient">to Know</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Have questions about our sprint agreements, Google ranking methodologies, or deliverable timelines? We have answers.
          </p>
        </div>

        <div className="space-y-3">
          {siteSettings.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 backdrop-blur-md overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-300 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-blue-50 text-blue-600 dark:bg-cyan-500/20 dark:text-cyan-400 border-blue-200 dark:border-cyan-500/40" : "text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

