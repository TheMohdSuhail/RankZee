"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validators/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const { success, error } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send message");

      setSubmitted(true);
      success("Message Delivered", "Thank you for contacting RankZee. We will respond shortly.");
      reset();
    } catch (err: any) {
      error("Submission Error", err.message || "Failed to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">Message Received</h3>
        <p className="text-sm text-slate-600 mb-6">
          Thank you for reaching out. A client partner will respond to your email within 4 business hours.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Name *</label>
          <Input placeholder="Rajesh Kumar" {...register("name")} error={errors.name?.message} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
          <Input type="email" placeholder="rajesh@company.com" {...register("email")} error={errors.email?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number (Optional)</label>
          <Input placeholder="+91 98765 43210" {...register("phone")} error={errors.phone?.message} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Subject *</label>
          <Input placeholder="Partnership / Project Inquiry" {...register("subject")} error={errors.subject?.message} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message *</label>
        <Textarea rows={4} placeholder="How can our digital marketing team help your brand?" {...register("message")} error={errors.message?.message} />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <span>Delivering Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            <span>Send Direct Message</span>
          </>
        )}
      </Button>
    </form>
  );
}
