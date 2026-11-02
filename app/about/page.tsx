import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Sparkles, Award, Shield, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | The Growth Architects Behind #1 Google Rankings",
  description: "Learn about RankZee's story, mission, and the senior performance engineers redefining digital marketing ROI.",
  alternates: {
    canonical: "/about",
  },
};

const LEADERSHIP_TEAM = [
  {
    name: "Aman Sharma",
    role: "Founder & Chief Executive Officer",
    bio: "Ex-Google organic search consultant with 12+ years of technical SEO architecture and enterprise growth experience.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rhea Deshmukh",
    role: "Partner & VP of Paid Media",
    bio: "Pioneered high-velocity Meta Advantage+ creative sprint methodologies managing ₹40Cr+ in annual ad spend.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Karan Johar",
    role: "Principal Frontend & Performance Architect",
    bio: "Specializes in sub-second Jamstack & Next.js architectures, headless e-commerce, and Core Web Vitals optimization.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Devika Rao",
    role: "Director of Analytics & Data Science",
    bio: "Architects server-to-server CAPI attribution and Looker Studio predictive modeling systems.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
];

const CORE_VALUES = [
  {
    title: "Zero Vanity Metrics",
    desc: "We refuse to celebrate impressions and clicks unless they translate directly into sales pipeline and revenue.",
    icon: Target,
  },
  {
    title: "Algorithmic Precision",
    desc: "Marketing is not guessing. We study search documentation, vector search papers, and machine learning bids systematically.",
    icon: Sparkles,
  },
  {
    title: "Radical Transparency",
    desc: "24/7 access to live Looker Studio dashboards and dedicated Slack pods. No smoke, no mirrors, no delayed PDF summaries.",
    icon: Eye,
  },
  {
    title: "Uncompromising Speed",
    desc: "In ad creative iteration and web application speed alike: fast beats slow, every single time.",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="default" className="mb-4 uppercase tracking-wider text-xs">
            Our Story & Heritage
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            We Built the Agency We <br />
            <span className="text-neon-gradient">Wished We Could Hire</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            RankZee was founded by senior engineers and growth leaders frustrated by the lack of accountability, technical depth, and transparency in traditional digital agencies.
          </p>
        </div>

        {/* Story & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
              The Genesis of RankZee
            </h2>
            <p>
              In 2021, when search engine algorithms shifted decisively toward semantic intent and Core Web Vitals, we realized that 95% of digital marketing agencies were still applying decade-old tactics: spammy backlinks, generic AI text, and superficial keyword counts.
            </p>
            <p>
              Brands were pouring millions into Google and Meta Ads, only to send that expensive traffic to clunky, 6-second-loading websites that leaked conversions at every step.
            </p>
            <p>
              RankZee was created to bridge this chasm. By bringing together senior full-stack software engineers, conversion copywriters, and performance marketers under one unified roof, we engineered an agency that treats digital growth as an algorithmic science.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-cyan-400 font-heading">₹85 Cr+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Client Revenue Generated</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-purple-400 font-heading">340+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">#1 Google Positions</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl h-[460px] bg-white">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="RankZee Strategy Pod collaborating on digital growth"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 dark:bg-slate-950/85 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg text-slate-900 dark:text-white">
              <p className="text-xs font-mono uppercase text-blue-600 dark:text-cyan-400 font-bold mb-1">Our Mission</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                To liberate high-potential businesses from marketing waste and empower them with predictable, verifiable Page 1 dominance.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="default" className="mb-3 uppercase text-[11px]">Guiding Principles</Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white">
              Values That Drive Every Campaign
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-colors shadow-sm hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-5">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2">{val.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="default" className="mb-3 uppercase text-[11px]">Senior Leadership</Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white">
              The Minds Behind the Engine
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Every client pod is guided directly by senior domain experts, not junior interns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 overflow-hidden group shadow-sm hover:shadow-md">
                <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs text-blue-600 dark:text-cyan-400 font-semibold mb-2">{member.role}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 border border-blue-500/30">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
            Want to collaborate on your next growth sprint?
          </h3>
          <p className="text-blue-100 text-sm max-w-xl mx-auto mb-6">
            Schedule an initial 45-minute discovery consultation with our strategy partners.
          </p>
          <Link href="/book-consultation">
            <Button size="lg" className="font-bold bg-white text-blue-700 hover:bg-slate-100 shadow-xl">
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
