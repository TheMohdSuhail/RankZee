"use client";

import React, { useState, useEffect } from "react";
import { siteSettings } from "@/lib/data/site-settings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cookie } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function CookiePolicyPage() {
  const { success } = useToast();
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rankzee-cookie-consent");
      if (stored) {
        const parsed = JSON.parse(stored);
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUpdate = (newAnalytics: boolean, newMarketing: boolean) => {
    const prefs = {
      essential: true,
      analytics: newAnalytics,
      marketing: newMarketing,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem("rankzee-cookie-consent", JSON.stringify(prefs));
      window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: prefs }));
      setAnalytics(newAnalytics);
      setMarketing(newMarketing);
      setSaved(true);
      success("Preferences Updated", "Your cookie settings have been saved.");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm mb-12">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mb-2">
              Cookie Policy
            </h1>
            <p className="text-xs font-mono text-blue-600 font-semibold">
              Last Updated: October 31, 2026 | Compliant with ePrivacy, GDPR & DPDPA
            </p>
          </div>

          {/* Live Cookie Manager Widget */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-bold text-slate-900">Your Live Cookie Preferences</h2>
                <p className="text-xs text-slate-600">Manage what tracking cookies RankZee is permitted to store in your browser.</p>
              </div>
            </div>

            <div className="space-y-4 my-6 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Strictly Necessary Cookies</span>
                  <span className="text-slate-600">Essential for core security, form processing, and layout rendering.</span>
                </div>
                <Badge variant="neon">Always Active</Badge>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Performance & Analytics (Google Analytics 4)</span>
                  <span className="text-slate-600">Anonymized traffic metrics and interaction logs to help us improve site speed.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600 bg-white border-slate-300 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Marketing & Retargeting (Meta Pixel / Ads)</span>
                  <span className="text-slate-600">Enables relevant digital advertising delivery and cross-platform campaign attribution.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600 bg-white border-slate-300 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="sm"
                onClick={() => handleUpdate(analytics, marketing)}
                className="text-xs font-bold"
              >
                {saved ? "✓ Preferences Saved!" : "Save Current Choices"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdate(true, true)}
                className="text-xs"
              >
                Accept All
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleUpdate(false, false)}
                className="text-xs"
              >
                Reject Non-Essential
              </Button>
            </div>
          </div>

          {/* Written Policy Text */}
          <div className="space-y-6 text-sm leading-relaxed text-slate-600">
            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">1. What Are Cookies?</h2>
              <p>
                Cookies are compact text files placed upon your computer, mobile device, or tablet when you navigate websites. Cookies facilitate efficient navigation, memorize preferences, authenticate sessions, and deliver anonymized analytical data to site operators.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">2. Categories of Cookies Deployed by RankZee</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                <li>
                  <strong>Strictly Necessary Cookies:</strong> Required to operate the core Next.js application, ensure security token persistence, and retain cookie consent choices in localStorage.
                </li>
                <li>
                  <strong>Analytics & Telemetry Cookies:</strong> We utilize Google Analytics 4 (GA4) with IP anonymization enabled. These cookies measure page dwell time, referral sources, and button clicks to help us optimize Core Web Vitals.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Deployed via Meta Platforms Inc. or Google Ads Remarketing tags to calculate advertising conversion rates and display relevant growth solutions to interested visitors.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">3. Browser-Level Cookie Management</h2>
              <p>
                In addition to our on-page consent manager above, you can configure your browser (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge) to refuse all cookies, alert you when a cookie is placed, or delete cached cookies upon closing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">4. Questions & Grievances</h2>
              <p>
                For privacy and cookie inquiries, reach our data protection representative at <a href={`mailto:${siteSettings.email}`} className="text-blue-600 hover:underline">{siteSettings.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
