"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Star,
  Globe2,
  CheckCircle,
  Search,
  Zap,
  BarChart3,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const [auditDomain, setAuditDomain] = useState("");

  const handleInstantAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditDomain.trim()) {
      router.push("/book-consultation");
      return;
    }
    const cleanDomain = auditDomain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
    router.push(`/book-consultation?domain=${encodeURIComponent(cleanDomain)}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50/40">
      {/* 1. Subtle High-Tech Perspective Grid & Radiant Light Blooms (Light Theme) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-400/15 via-indigo-400/15 to-cyan-300/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-sky-400/10 blur-[130px] pointer-events-none rounded-full" />

      {/* 2. Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Live Telemetry Pill */}
        <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-full bg-white border border-slate-200/90 shadow-sm mb-8 hover:border-blue-400/60 transition-all duration-300 group">
          <span className="flex h-2.5 w-2.5 relative ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-semibold text-slate-700 tracking-wider uppercase">
            Google Algorithm Engine: <span className="text-blue-600 font-bold">Active & Dominating</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.08] mb-6">
          Rank Up. Scale Fast. <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Dominate Google & Beyond.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          RankZee combines data-driven <span className="text-slate-900 font-semibold">Technical SEO</span>, high-velocity <span className="text-slate-900 font-semibold">Paid Ad Funnels</span>, and sub-second <span className="text-slate-900 font-semibold">Next.js Web Applications</span> to turn commercial search intent into predictable pipeline revenue.
        </p>

        {/* Interactive Instant Domain Audit Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleInstantAudit}
            className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white border border-slate-300/80 shadow-xl shadow-blue-500/10 flex flex-col sm:flex-row items-center gap-2 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all"
          >
            <div className="flex items-center gap-2.5 px-4 w-full sm:w-auto flex-1">
              <Globe2 className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                type="text"
                placeholder="Enter your website URL (e.g. yourcompany.com)"
                value={auditDomain}
                onChange={(e) => setAuditDomain(e.target.value)}
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base outline-none font-sans"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto rounded-xl sm:rounded-full px-8 py-3.5 font-bold text-sm sm:text-base shrink-0 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all"
            >
              <span>Get Free 60s Audit</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Form Trust Micro-Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Instant competitor gap analysis
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              Confidential executive report
            </span>
          </div>
        </div>

        {/* Secondary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/portfolio" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base px-7 bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm"
            >
              <span>View Verified Client Results</span>
            </Button>
          </Link>
          <Link href="/services" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <span>Explore All 9 Services</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* 3. Live Google SERP #1 Showcase Deck (Clean Modern Light Theme Visual) */}
        <div className="max-w-4xl mx-auto mb-16 p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/60 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-slate-400 ml-2">google.com/search?q=best+digital+marketing+agency</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
              <Sparkles className="w-3 h-3" />
              <span>Position #1 on SERP</span>
            </div>
          </div>

          <div className="pt-5 space-y-4">
            {/* Google Result #1 Mock */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">rankzee.com</span>
                <span>›</span>
                <span>solutions</span>
                <span>›</span>
                <span className="text-blue-600 font-medium">digital-growth</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-600 hover:underline cursor-pointer mb-2">
                RankZee Digital Marketing Agency | #1 Growth, SEO & Performance Marketing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                Scale your pipeline with data-obsessed Technical SEO, high-velocity Meta & Google Ads, and custom Next.js web applications. Average client ROAS of 4.8x and 340+ keywords ranked #1 on Google.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center text-amber-500 font-semibold gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.9</span>
                  <span className="text-slate-400 font-normal">(80+ verified reviews)</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 font-semibold">+480% Organic Search Traffic</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Free 60-Sec Growth Audit Available</span>
              </div>
            </div>

            {/* Live Metrics Grid inside Card Deck */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
                <p className="text-xl sm:text-2xl font-extrabold text-blue-600 font-heading">#1 Spot</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Google SERP Rank</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
                <p className="text-xl sm:text-2xl font-extrabold text-indigo-600 font-heading">4.8x</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Average Paid ROAS</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 font-heading">0.4s</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Sub-second LCP</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
                <p className="text-xl sm:text-2xl font-extrabold text-cyan-600 font-heading">96.4%</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Retention Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Verified Proof Badges Strip */}
        <div className="pt-10 border-t border-slate-200 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-left">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-400 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-none">4.8x</p>
                <p className="text-xs text-slate-500 mt-1">Average Client ROAS</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-cyan-400 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-none">340+</p>
                <p className="text-xs text-slate-500 mt-1">#1 Google Keywords</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-purple-400 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-none">96.4%</p>
                <p className="text-xs text-slate-500 mt-1">Client Retention Rate</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-400 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-none">4.9 / 5</p>
                <p className="text-xs text-slate-500 mt-1">80+ Verified Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
