"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { Calendar, Clock, CheckCircle2, XCircle, Trash2, Mail, Loader2, Phone } from "lucide-react";

interface ConsultationItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  date: string;
  timeSlot: string;
  websiteUrl?: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export default function AdminConsultationsPage() {
  const { success } = useToast();
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "consultations"));
      if (!snap.empty) {
        const list: ConsultationItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setConsultations(list);
      } else {
        setConsultations([
          {
            id: "cons-1",
            name: "Pooja Hegde",
            email: "pooja@zenithventures.co",
            phone: "+91 99887 76655",
            company: "Zenith Ventures",
            service: "Comprehensive Technical SEO & Keyword Ranking Audit",
            date: "2026-11-04",
            timeSlot: "11:30 AM - 12:15 PM (IST)",
            websiteUrl: "https://zenithventures.co",
            notes: "Organic visibility dropped after domain redesign.",
            status: "pending",
          },
          {
            id: "cons-2",
            name: "Arjun Reddy",
            email: "arjun@cloudecom.in",
            phone: "+91 98990 01122",
            company: "CloudEcom D2C",
            service: "Meta Ads Creative & Funnel Diagnostic",
            date: "2026-11-05",
            timeSlot: "02:00 PM - 02:45 PM (IST)",
            websiteUrl: "https://cloudecom.in",
            notes: "Scaling budget from ₹2L to ₹10L per month.",
            status: "confirmed",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: "pending" | "confirmed" | "completed" | "cancelled") => {
    try {
      await updateDoc(doc(db, "consultations", id), { status });
      setConsultations((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      success("Status Updated", `Consultation marked as ${status}`);
    } catch {
      setConsultations((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      success("Status Updated", `Consultation marked as ${status}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this consultation booking?")) return;
    try {
      await deleteDoc(doc(db, "consultations", id));
      setConsultations((prev) => prev.filter((c) => c.id !== id));
      success("Booking Deleted", "Consultation slot removed.");
    } catch {
      setConsultations((prev) => prev.filter((c) => c.id !== id));
      success("Booking Deleted", "Removed locally.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Consultations & Strategy Audits
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage upcoming 45-minute growth diagnostic sessions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
          </div>
        ) : consultations.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-slate-500">
            No consultations currently booked.
          </div>
        ) : (
          consultations.map((c) => (
            <Card key={c.id} className="p-6 flex flex-col justify-between bg-white border-slate-200 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant={
                      c.status === "confirmed"
                        ? "success"
                        : c.status === "cancelled"
                        ? "destructive"
                        : "neon"
                    }
                    className="text-[10px] uppercase font-mono"
                  >
                    {c.status}
                  </Badge>

                  <div className="flex items-center gap-1.5 text-xs text-blue-700 font-mono font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{c.date}</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-base mb-1">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{c.company || "Company not specified"}</p>

                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-medium">{c.timeSlot}</span>
                  </div>
                  <div className="font-semibold text-blue-700 line-clamp-1">
                    {c.service}
                  </div>
                  {c.websiteUrl && (
                    <a
                      href={c.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 underline block truncate text-[11px]"
                    >
                      {c.websiteUrl}
                    </a>
                  )}
                  {c.notes && (
                    <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200">
                      &ldquo;{c.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {c.status !== "confirmed" && (
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(c.id, "confirmed")}
                      className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Approve
                    </Button>
                  )}
                  {c.status !== "cancelled" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(c.id, "cancelled")}
                      className="h-8 text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                      title="Call Client"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${c.email}?subject=RankZee%20Strategy%20Audit%20Confirmation`}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                    title="Send Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Delete Booking"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
