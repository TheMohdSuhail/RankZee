"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "ORD-DEMO123";
  const provider = searchParams.get("provider") || "razorpay";

  return (
    <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-emerald-500/30 text-center shadow-2xl relative">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">
        Payment Confirmed!
      </h1>

      <p className="text-sm text-slate-300 leading-relaxed mb-6">
        Thank you for trusting RankZee with your digital marketing growth sprint. Your order has been registered and verified.
      </p>

      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-left space-y-2 mb-8 font-mono">
        <div className="flex justify-between">
          <span className="text-slate-400">Order ID:</span>
          <span className="text-cyan-300 font-semibold">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Gateway:</span>
          <span className="text-slate-200 uppercase">{provider}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Status:</span>
          <span className="text-emerald-400 font-semibold">Payment Received</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link href="/dashboard" className="w-full block">
          <Button size="lg" className="w-full font-bold">
            <span>Go to Client Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        <Link href="/" className="w-full block">
          <Button variant="ghost" size="sm" className="w-full text-xs text-slate-400">
            Return to Home
          </Button>
        </Link>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>A copy of your tax invoice has been dispatched to your email.</span>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mr-3" />
            <span>Loading receipt...</span>
          </div>
        }
      >
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}

