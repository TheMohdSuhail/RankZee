"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { samplePricingPlans, PricingPlanItem } from "@/lib/data/sample-pricing";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ShieldCheck, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth-context";
import { useToast } from "@/components/ui/toast";

export function PricingPreview() {
  const router = useRouter();
  const { user } = useAuth();
  const { error } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = (plan: PricingPlanItem) => {
    router.push(`/book-consultation?plan=${encodeURIComponent(plan.name)}`);
  };

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3 uppercase tracking-wider text-[11px]">
            Transparent Investment
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Growth Packages for <span className="text-neon-gradient">Every Scale</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Fixed monthly pricing. No hidden fees. Transparent sprints tied directly to performance milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {samplePricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative shadow-sm ${
                plan.highlighted
                  ? "bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border-2 border-blue-600 dark:border-cyan-400 shadow-xl shadow-blue-500/10 dark:shadow-cyan-500/20 lg:-translate-y-3"
                  : "bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-white/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="px-3 py-1 font-bold text-xs uppercase tracking-wider bg-blue-600 text-white shadow-md">
                    {plan.badge || "Most Popular"}
                  </Badge>
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {formatCurrency(plan.price, plan.currency)}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/{plan.period}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    + Applicable GST. Monthly sprint cadence.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    What&apos;s Included:
                  </p>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Button
                  onClick={() => handleCheckout(plan)}
                  disabled={loadingPlan === plan.id}
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                  className={`w-full font-bold justify-center ${plan.highlighted ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25" : "bg-white hover:bg-slate-50 text-slate-800 border-slate-300"}`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Preparing Secure Checkout...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Started with {plan.name}</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-center text-slate-500 mt-3">
                  Or schedule a <Link href="/book-consultation" className="text-blue-600 dark:text-cyan-400 hover:underline">free strategy call</Link> first.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Elements Near Pricing (Requirement 8) */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-semibold">100% Risk-Mitigated Terms</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">Transparent 30-day exit terms. No hostage lock-ins.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-semibold">Bank-Grade Encryption</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">PCI-DSS compliant via Razorpay / Stripe / UPI.</p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 space-x-2">
            <Link href="/refund-and-cancellation-policy" className="text-blue-600 dark:text-cyan-400 hover:underline">
              Refund Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="text-blue-600 dark:text-cyan-400 hover:underline">
              Terms
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="text-blue-600 dark:text-cyan-400 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

