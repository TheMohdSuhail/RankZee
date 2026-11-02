import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { samplePortfolio, CaseStudyItem } from "@/lib/data/sample-portfolio";
import { adminDb } from "@/lib/firebase/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Quote, TrendingUp } from "lucide-react";

interface Props {
  params: { slug: string };
}

async function getCaseStudy(slug: string): Promise<CaseStudyItem | null> {
  try {
    const snap = await adminDb().collection("portfolio").doc(slug).get();
    if (snap.exists) {
      return snap.data() as CaseStudyItem;
    }
  } catch {
    // fallback
  }
  return samplePortfolio.find((p) => p.slug === slug) || null;
}

export async function generateStaticParams() {
  return samplePortfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getCaseStudy(params.slug);
  if (!item) return { title: "Case Study Not Found" };

  return {
    title: item.seo?.metaTitle || `${item.title} | RankZee Case Study`,
    description: item.seo?.metaDescription || item.summary,
    alternates: {
      canonical: `/portfolio/${item.slug}`,
    },
    openGraph: {
      title: item.title,
      description: item.summary,
      images: [item.images[0] || `/api/og?title=${encodeURIComponent(item.title)}`],
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const item = await getCaseStudy(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-mono">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-cyan-400">Home</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-blue-600 dark:hover:text-cyan-400">Case Studies</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold truncate">{item.client}</span>
        </nav>

        {/* Title & Metadata */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="default">{item.category}</Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">{item.client} • {item.industry}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            {item.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            {item.summary}
          </p>
        </div>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm mb-12">
          {item.metrics.map((m, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-blue-600 dark:text-cyan-400 mb-1">
                {m.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Cover Hero Image */}
        <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 mb-16 shadow-2xl">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Challenge & Solution Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-red-500/20 shadow-sm">
            <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>The Core Challenge</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.challenge}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-500/20 shadow-sm">
            <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>RankZee Strategic Solution</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.solution}
            </p>
          </div>
        </div>

        {/* Concrete Measured Results */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm mb-16">
          <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6">
            Documented Results & Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.results.map((res, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-sm text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="font-medium">{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Quote */}
        {item.testimonial && (
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50/40 to-slate-50 dark:from-blue-950/40 dark:to-slate-900 border border-blue-200 dark:border-cyan-500/30 mb-16 shadow-sm">
            <Quote className="w-10 h-10 text-blue-500/20 dark:text-cyan-400/30 mb-4" />
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 italic leading-relaxed mb-6">
              &ldquo;{item.testimonial.quote}&rdquo;
            </p>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{item.testimonial.author}</p>
              <p className="text-xs text-blue-600 dark:text-cyan-400 font-semibold">{item.testimonial.role}</p>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 border border-blue-500/30">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
            Ready to achieve comparable growth for your brand?
          </h3>
          <p className="text-sm text-blue-100 max-w-lg mx-auto mb-6">
            Let our senior growth architects analyze your current domain and formulate an initial execution plan.
          </p>
          <Link href="/book-consultation">
            <Button size="lg" className="font-bold bg-white text-blue-700 hover:bg-slate-100 shadow-xl">
              <span>Book Discovery Teardown</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
