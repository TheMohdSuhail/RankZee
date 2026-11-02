import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sampleServices, ServiceItem } from "@/lib/data/sample-services";
import { adminDb } from "@/lib/firebase/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { StructuredData } from "@/components/seo/structured-data";
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import * as Icons from "lucide-react";

interface Props {
  params: { slug: string };
}

async function getService(slug: string): Promise<ServiceItem | null> {
  // 1. Try Firestore
  try {
    const snap = await adminDb().collection("services").doc(slug).get();
    if (snap.exists) {
      return snap.data() as ServiceItem;
    }
  } catch {
    // Firestore fallback
  }

  // 2. Fallback to sample data
  const local = sampleServices.find((s) => s.slug === slug);
  return local || null;
}

export async function generateStaticParams() {
  return sampleServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.seo?.metaTitle || `${service.title} | RankZee Agency`,
    description: service.seo?.metaDescription || service.shortDesc,
    keywords: service.seo?.keywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.shortDesc,
      images: [`/api/og?title=${encodeURIComponent(service.title)}&desc=${encodeURIComponent(service.shortDesc)}`],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getService(params.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = (Icons as any)[service.icon] || Icons.Sparkles;

  return (
    <div className="pt-28 pb-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      {/* Service Schema */}
      <StructuredData
        type="Service"
        data={{
          name: service.title,
          description: service.longDesc,
          provider: {
            "@type": "Organization",
            name: "RankZee Digital Marketing Agency",
          },
        }}
      />
      {service.faqs && service.faqs.length > 0 && (
        <StructuredData type="FAQPage" data={{ faqs: service.faqs }} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-mono">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-cyan-400">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-blue-600 dark:hover:text-cyan-400">Services</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold truncate">{service.title}</span>
        </nav>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-8">
            <Badge variant="default" className="mb-4 uppercase text-[11px] font-mono tracking-wider">
              Specialized Capability
            </Badge>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {service.longDesc}
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-blue-50 dark:bg-gradient-to-tr dark:from-blue-600/30 dark:via-violet-600/30 dark:to-cyan-400/30 border border-blue-200 dark:border-white/20 flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-xl shadow-blue-500/10">
              <IconComponent className="w-16 h-16" />
            </div>
          </div>
        </div>

        {/* Features & Deliverables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Key Features */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
              <span>Core Architectural Components</span>
            </h2>
            <div className="space-y-4">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tangible Deliverables */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-purple-400" />
              <span>Concrete Deliverables & Assets</span>
            </h2>
            <div className="space-y-4">
              {service.deliverables && service.deliverables.length > 0 ? (
                service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 dark:bg-purple-500/20 text-indigo-600 dark:text-purple-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ✓
                    </div>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">Custom deliverables configured per sprint agreement.</p>
              )}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Includes 24/7 Looker Studio Dashboard access and weekly sync sprints.</span>
            </div>
          </div>
        </div>

        {/* Service FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge variant="default" className="mb-2 uppercase text-[11px]">Frequently Clarified</Badge>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
                Questions Regarding {service.title}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Embedded Inquiry Form Pre-configured for this Service */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/30 max-w-4xl mx-auto shadow-xl shadow-slate-200/50">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2">
              Inquire About {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Submit your project scope below to receive a free audit and tailored proposal from our senior strategist.
            </p>
          </div>

          <LeadForm defaultService={service.title} source={`service_page_${service.slug}`} />
        </div>
      </div>
    </div>
  );
}
