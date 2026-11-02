"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/branding/logo";
import { siteSettings } from "@/lib/data/site-settings";
import { Mail, Phone, MapPin, Send, MessageSquare, Check, ShieldCheck, Lock } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Omit footer on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // optimistic fallback
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-sm overflow-hidden transition-colors">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-blue-600/5 dark:from-blue-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showTagline={true} size="md" />
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              RankZee is a premier technology-driven digital marketing agency. We engineer #1 Google rankings, high-conversion paid advertising funnels, and sub-second Next.js digital platforms for ambitious brands worldwide.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span>{siteSettings.address.street}, {siteSettings.address.city}, {siteSettings.address.state} - {siteSettings.address.postalCode}, {siteSettings.address.country}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  {siteSettings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <Phone className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <a href={`tel:${siteSettings.phone}`} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  {siteSettings.phone}
                </a>
              </div>
            </div>

            {/* WhatsApp Quick Chat */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20RankZee%20team,%20I'd%20like%20to%20discuss%20a%20digital%20marketing%20campaign`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/25 transition-all text-xs font-semibold shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-heading font-semibold text-sm tracking-wide mb-4 uppercase">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/seo-search-engine-optimization" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Search Engine Optimization (SEO)
                </Link>
              </li>
              <li>
                <Link href="/services/ppc-google-ads" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Google Ads & PPC Management
                </Link>
              </li>
              <li>
                <Link href="/services/meta-ads-facebook-instagram" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Meta Ads (Facebook & IG)
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-marketing" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/content-marketing" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Content Marketing & Copy
                </Link>
              </li>
              <li>
                <Link href="/services/email-whatsapp-marketing" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Email & WhatsApp Automation
                </Link>
              </li>
              <li>
                <Link href="/services/web-design-development" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Next.js Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/analytics-reporting-cro" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  GA4 Analytics & CRO
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Company */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-heading font-semibold text-sm tracking-wide mb-4 uppercase">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  About Our Agency
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Growth Packages & Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Marketing Insights & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Contact Our Growth Team
                </Link>
              </li>
              <li>
                <Link href="/book-consultation" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium text-blue-600 dark:text-cyan-300">
                  Book Free Growth Audit
                </Link>
              </li>
            </ul>

            {/* Payment Trust Note */}
            <div className="mt-6 p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm text-[11px] space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-200 font-semibold">
                <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>100% Secure Payments</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-snug">
                Supported via PCI-DSS Compliant Gateways (Razorpay, Stripe, UPI & Cards).
              </p>
            </div>
          </div>

          {/* Column 4: Newsletter & Grievance */}
          <div className="space-y-4">
            <h4 className="text-slate-900 dark:text-white font-heading font-semibold text-sm tracking-wide uppercase">
              Weekly Growth Intel
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Get tested algorithmic updates, zero-BS SEO teardowns, and high-ROAS creative formulas delivered to your inbox every Tuesday.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full h-10 px-3.5 pr-10 text-xs rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="absolute right-1 top-1 h-8 w-8 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center transition-colors disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ You are subscribed to RankZee Growth Intel.
                </p>
              )}
            </form>

            {/* Grievance Officer details for compliance */}
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 dark:border-white/5 space-y-1">
              <p className="font-semibold text-slate-700 dark:text-slate-400">Grievance & Compliance Officer:</p>
              <p>{siteSettings.grievanceOfficer.name} ({siteSettings.grievanceOfficer.designation})</p>
              <p>Email: <a href={`mailto:${siteSettings.grievanceOfficer.email}`} className="text-blue-600 dark:text-cyan-400 hover:underline">{siteSettings.grievanceOfficer.email}</a></p>
            </div>
          </div>
        </div>

        {/* Legal & Policy Navigation Bar (Compliant with Payment Gateways & IT Rules) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} {siteSettings.legalName}. All rights reserved.</p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Certified Digital Growth Agency. Last updated: October 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]">
            <Link href="/terms-and-conditions" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/refund-and-cancellation-policy" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Refund & Cancellation
            </Link>
            <span>•</span>
            <Link href="/shipping-and-delivery-policy" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Service Delivery Policy
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Cookie Policy
            </Link>
            <span>•</span>
            <Link href="/acceptable-use-policy" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Acceptable Use
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-blue-600 dark:hover:text-cyan-400 font-medium transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

