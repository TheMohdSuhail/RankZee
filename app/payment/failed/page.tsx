"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight, RefreshCcw } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-red-500/30 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">
          Payment Incomplete
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          The transaction could not be authorized or was cancelled by the card issuing bank / UPI provider. No charges were made to your account.
        </p>

        <div className="space-y-3">
          <Link href="/pricing" className="w-full block">
            <Button size="lg" className="w-full font-bold">
              <RefreshCcw className="w-4 h-4 mr-2" />
              <span>Retry Payment</span>
            </Button>
          </Link>

          <Link href="/contact" className="w-full block">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Contact Billing Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

