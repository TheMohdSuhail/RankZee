"use client";

import React from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CheckCircle2, Zap, Clock } from "lucide-react";

export function LeadFormSection() {
  return (
    <section id="contact-form" className="py-24 bg-slate-50 dark:bg-slate-900/40 relative border-t border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Trust & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="default" className="uppercase tracking-wider text-[11px]">
              Direct Inbound Channel
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Get Your Custom <br />
              <span className="text-neon-gradient">Growth Blueprint</span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Tell us about your brand, current customer acquisition cost, and revenue goals. Our senior strategists will formulate an objective teardown before our first discovery call.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">2-Hour Rapid Response</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Direct communication from a senior growth director, not a junior rep.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-blue-500/10 border border-indigo-200 dark:border-blue-500/20 text-indigo-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Full Competitive Intel Report</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Uncover top competitor keywords, estimated ad spend, and backlink gaps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Strict Non-Disclosure</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your data and brand metrics are never shared or publicised without consent.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-2xl relative">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white">
                  Request Growth Proposal
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Fill in your details below to begin your consultation.
                </p>
              </div>

              <LeadForm source="home_bottom_form" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

