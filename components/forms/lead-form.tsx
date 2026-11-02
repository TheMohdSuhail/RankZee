"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormData } from "@/lib/validators/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface LeadFormProps {
  source?: string;
  defaultService?: string;
  className?: string;
}

const SERVICE_OPTIONS = [
  "Search Engine Optimization (SEO)",
  "PPC & Google Ads Management",
  "Meta Ads (Facebook & Instagram)",
  "Social Media Marketing (SMM)",
  "Content Marketing & Copywriting",
  "Email & WhatsApp Marketing",
  "Web Design & Next.js Development",
  "Branding & Visual Identity",
  "Analytics, CRO & Reporting",
  "Full-Stack Multi-Channel Growth",
];

const BUDGET_OPTIONS = [
  "₹40,000 - ₹80,000 / month",
  "₹80,000 - ₹1,50,000 / month",
  "₹1,50,000 - ₹3,00,000 / month",
  "₹3,00,000+ / month (Enterprise)",
];

export function LeadForm({ source = "home_page", defaultService = "", className = "" }: LeadFormProps) {
  const { success, error } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      source,
      service: defaultService,
      budget: "₹80,000 - ₹1,50,000 / month",
      honeypot: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit inquiry");
      }

      setSubmitted(true);
      success("Inquiry Received!", "Our Growth Director will contact you within 2 business hours.");
      reset();
    } catch (err: any) {
      error("Submission Failed", err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`p-8 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center animate-in zoom-in-95 ${className}`}>
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-heading font-bold text-white mb-2">
          Your Growth Blueprint is Underway!
        </h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
          Thank you for reaching out to RankZee. We have received your project details and our senior strategist is already running initial competitive reconnaissance.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSubmitted(false)}
          className="text-xs border-cyan-400/40 text-cyan-300"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      {/* Honeypot anti-spam field */}
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name <span className="text-blue-600 dark:text-cyan-400">*</span>
          </label>
          <Input
            placeholder="e.g. Rahul Sharma"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Work Email <span className="text-blue-600 dark:text-cyan-400">*</span>
          </label>
          <Input
            type="email"
            placeholder="rahul@company.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Phone / WhatsApp <span className="text-blue-600 dark:text-cyan-400">*</span>
          </label>
          <Input
            placeholder="+91 98765 43210"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Company / Website
          </label>
          <Input
            placeholder="company.com"
            {...register("company")}
            error={errors.company?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Primary Objective / Service <span className="text-blue-600 dark:text-cyan-400">*</span>
          </label>
          <select
            {...register("service")}
            className="flex h-11 w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-950/60 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-inner backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400"
          >
            <option value="">Select Service Area</option>
            {SERVICE_OPTIONS.map((svc) => (
              <option key={svc} value={svc} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
                {svc}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.service.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Estimated Monthly Budget <span className="text-blue-600 dark:text-cyan-400">*</span>
          </label>
          <select
            {...register("budget")}
            className="flex h-11 w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-950/60 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-inner backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400"
          >
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
                {b}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Project Goals & Current Challenges <span className="text-blue-600 dark:text-cyan-400">*</span>
        </label>
        <Textarea
          rows={3}
          placeholder="Briefly describe your current traffic, target audience, and primary growth goals..."
          {...register("message")}
          error={errors.message?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        size="lg"
        className="w-full font-bold shadow-xl shadow-blue-600/30 text-base py-3"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            <span>Analyzing Project Requirements...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2 text-cyan-300" />
            <span>Claim Your Custom Growth Plan</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

      <p className="text-[11px] text-center text-slate-500">
        🔒 Strictly confidential. 100% spam-free guarantee. No sales harassment.
      </p>
    </form>
  );
}

