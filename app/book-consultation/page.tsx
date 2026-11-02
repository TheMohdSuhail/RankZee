import React from "react";
import { Metadata } from "next";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, ShieldCheck, Sparkles, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Free Growth Audit & Strategy Consultation | RankZee",
  description: "Schedule a complimentary 45-minute technical SEO & paid media teardown with a senior RankZee growth director.",
  alternates: {
    canonical: "/book-consultation",
  },
};

export default function BookConsultationPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="neon" className="mb-3 uppercase tracking-wider text-xs">
            Complimentary Strategic Session
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
            Book Your Free <span className="text-neon-gradient">Growth Audit</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            A 45-minute deep-dive teardown with a senior growth strategist. No pitch decks, no sales pressure—just actionable algorithmic reconnaissance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-heading font-bold text-slate-900">
                What You Receive in the Session:
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/60">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">80+ Point Technical SEO Audit</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Core Web Vitals health, crawl bottlenecks, and indexing barriers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200/60">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Top 3 Competitor Ad & Keyword Recon</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Which search terms are bringing them commercial sales and high-intent traffic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Paid Ad ROAS Waste Teardown</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Identifying bleeding ad spend, negative keyword leakage, and pixel drop-offs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-200/60">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">90-Day Compounding Roadmap</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Prioritized step-by-step blueprint you can execute internally or with us.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-slate-700">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>Conducted via Google Meet with live screen share</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Duration: 45 minutes</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/70 text-xs text-slate-600 flex items-center gap-3 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Strict 100% no-pressure guarantee. If we are not the right fit for your goals, we will candidly point you in the right direction.</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-heading font-bold text-slate-900">Reserve Your Strategy Session</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Select your preferred date, time slot, and domain focus.</p>
              </div>

              <ConsultationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
