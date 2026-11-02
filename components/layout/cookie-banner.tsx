"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, Shield, Check, X, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rankzee-cookie-consent");
      if (!stored) {
        // Display banner after short delay
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore SSR or storage errors
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem("rankzee-cookie-consent", JSON.stringify(prefs));
      window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: prefs }));
    } catch {
      // storage disabled
    }
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in slide-in-from-bottom-5">
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl p-5 shadow-2xl text-slate-700 dark:text-slate-200 transition-colors">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-cyan-400">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Privacy & Cookie Preferences</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              We respect your privacy. We use cookies to enhance performance, measure analytics, and deliver personalized marketing insights in accordance with the Indian Digital Personal Data Protection Act (DPDPA) & GDPR.
            </p>
          </div>
        </div>

        {/* Customization Drawer */}
        {showCustomize && (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-transparent">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Essential Cookies</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Required for security & core site functionality.</p>
              </div>
              <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-400/10 px-2 py-0.5 rounded">Always On</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-transparent">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Analytics Cookies (GA4)</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Anonymized traffic & funnel measurement.</p>
              </div>
              <input
                type="checkbox"
                checked={analyticsAllowed}
                onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-transparent">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Marketing & Pixel Cookies</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Personalized campaign attribution.</p>
              </div>
              <input
                type="checkbox"
                checked={marketingAllowed}
                onChange={(e) => setMarketingAllowed(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!showCustomize ? (
            <>
              <Button size="sm" onClick={handleAcceptAll} className="text-xs flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Accept All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectNonEssential}
                className="text-xs flex-1 bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
              >
                Reject Non-Essential
              </Button>
              <button
                onClick={() => setShowCustomize(true)}
                className="p-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                title="Customize preferences"
                aria-label="Customize cookie settings"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={handleSaveCustom} className="text-xs flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Save Preferences
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomize(false)}
                className="text-xs bg-white text-slate-700 border-slate-300"
              >
                Back
              </Button>
            </>
          )}
        </div>

        <div className="mt-3 text-center">
          <Link
            href="/cookie-policy"
            className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 underline underline-offset-2"
          >
            Read our full Cookie Policy & Legal Terms
          </Link>
        </div>
      </div>
    </div>
  );
}

