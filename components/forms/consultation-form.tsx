"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultationFormSchema, ConsultationFormData } from "@/lib/validators/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Calendar, Clock, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const TIME_SLOTS = [
  "10:00 AM - 10:45 AM (IST)",
  "11:30 AM - 12:15 PM (IST)",
  "02:00 PM - 02:45 PM (IST)",
  "04:00 PM - 04:45 PM (IST)",
  "06:00 PM - 06:45 PM (IST)",
];

const AUDIT_FOCUS_AREAS = [
  "Comprehensive Technical SEO & Keyword Ranking Audit",
  "Google Ads / PPC Waste & ROAS Audit",
  "Meta Ads Creative & Funnel Diagnostic",
  "Next.js Speed & Core Web Vitals Optimization",
  "Full-Funnel CRO & Attribution Audit",
];

export function ConsultationForm() {
  const { success, error } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      timeSlot: "11:30 AM - 12:15 PM (IST)",
      service: AUDIT_FOCUS_AREAS[0],
      honeypot: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to schedule consultation");

      setSubmitted(true);
      success("Consultation Scheduled!", "A calendar invite with Google Meet link has been sent to your email.");
      reset();
    } catch (err: any) {
      error("Booking Error", err.message || "Failed to schedule. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">
          Audit Strategy Session Booked!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
          Check your email for the calendar invitation and preparation checklist. Prior to our call, our team will run automated crawls on your domain.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Schedule Another Session
        </Button>
      </div>
    );
  }

  // Calculate minimum selectable date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Name *</label>
          <Input placeholder="Priya Sharma" {...register("name")} error={errors.name?.message} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Business Email *</label>
          <Input type="email" placeholder="priya@brand.com" {...register("email")} error={errors.email?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone / WhatsApp *</label>
          <Input placeholder="+91 98765 43210" {...register("phone")} error={errors.phone?.message} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Company & Website URL</label>
          <Input placeholder="https://yourbrand.com" {...register("websiteUrl")} error={errors.websiteUrl?.message} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Area of Audit Focus *</label>
        <select
          {...register("service")}
          className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {AUDIT_FOCUS_AREAS.map((area) => (
            <option key={area} value={area} className="text-slate-900">
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Preferred Date *</span>
            </span>
          </label>
          <Input type="date" min={minDate} {...register("date")} error={errors.date?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Preferred Time Slot *</span>
            </span>
          </label>
          <select
            {...register("timeSlot")}
            className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot} className="text-slate-900">
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Specific Questions or Goals (Optional)
        </label>
        <Textarea
          rows={3}
          placeholder="e.g. We want to know why our Google Ads cost-per-click doubled this quarter..."
          {...register("notes")}
        />
      </div>

      <Button type="submit" disabled={submitting} size="lg" className="w-full font-bold">
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            <span>Reserving Slot...</span>
          </>
        ) : (
          <>
            <span>Confirm 45-Min Strategy Session</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
