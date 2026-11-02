"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Calendar, FileText, ShoppingBag, ShieldCheck, LogOut, Loader2, Clock } from "lucide-react";

interface OrderRecord {
  id: string;
  orderId: string;
  planName: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: any;
}

interface InquiryRecord {
  id: string;
  service: string;
  budget: string;
  status: string;
  createdAt: any;
  message: string;
}

interface ConsultationRecord {
  id: string;
  service: string;
  date: string;
  timeSlot: string;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, isAdmin, loading, signOut } = useAuth();

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
      return;
    }

    async function loadUserData() {
      if (!user) return;
      try {
        // 1. Fetch user orders
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const orderSnap = await getDocs(ordersQuery);
        const ordersList: OrderRecord[] = orderSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));
        setOrders(ordersList);

        // 2. Fetch user inquiries by email
        if (user.email) {
          const leadQuery = query(
            collection(db, "leads"),
            where("email", "==", user.email)
          );
          const leadSnap = await getDocs(leadQuery);
          const leadsList: InquiryRecord[] = leadSnap.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as any),
          }));
          setInquiries(leadsList);

          // 3. Fetch consultations by email
          const consQuery = query(
            collection(db, "consultations"),
            where("email", "==", user.email)
          );
          const consSnap = await getDocs(consQuery);
          const consList: ConsultationRecord[] = consSnap.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as any),
          }));
          setConsultations(consList);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setFetching(false);
      }
    }

    if (user) {
      loadUserData();
    }
  }, [user, loading, router]);

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
                Client Portal
              </h1>
              {isAdmin && (
                <Badge variant="neon" className="text-xs">
                  Admin Privileges
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Welcome back, <span className="text-slate-900 font-semibold">{user.displayName || user.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin")}
                className="text-xs border-blue-400 text-blue-600"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                <span>Admin Console</span>
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={signOut}
              className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* User Profile Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xl font-bold font-heading shrink-0">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-bold text-slate-900 text-base truncate">
                  {user.displayName || "Client User"}
                </h3>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                <span className="inline-block mt-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                  Account: {profile?.role || "Client"}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between bg-white border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase font-mono">Active Inquiries</span>
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-3xl font-heading font-extrabold text-slate-900 mt-2">
              {inquiries.length}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Lead requests submitted</p>
          </Card>

          <Card className="p-6 flex flex-col justify-between bg-white border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase font-mono">Consultations</span>
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-3xl font-heading font-extrabold text-slate-900 mt-2">
              {consultations.length}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Strategy sessions scheduled</p>
          </Card>
        </div>

        {/* User Sections */}
        <div className="space-y-8">
          {/* 1. Inquiries */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-heading font-bold text-slate-900">
                  My Inquiries & Proposals
                </h2>
              </div>
              <Badge variant="secondary" className="text-xs">
                {inquiries.length} Requests
              </Badge>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                <p>No project inquiries registered for this email address.</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push("/#contact-form")}
                  className="mt-3 text-xs"
                >
                  Submit Inquiry
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{inq.service}</h4>
                      <p className="text-slate-600 mt-0.5">Budget: {inq.budget}</p>
                      <p className="text-slate-500 text-[11px] mt-1 line-clamp-1">&ldquo;{inq.message}&rdquo;</p>
                    </div>
                    <Badge variant={inq.status === "new" ? "neon" : "default"}>
                      Status: {inq.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Scheduled Strategy Sessions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-heading font-bold text-slate-900">
                  Scheduled Strategy Sessions
                </h2>
              </div>
              <Badge variant="secondary" className="text-xs">
                {consultations.length} Sessions
              </Badge>
            </div>

            {consultations.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                <p>No consultation sessions booked.</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push("/book-consultation")}
                  className="mt-3 text-xs"
                >
                  Book Free Growth Audit
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {consultations.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{c.service}</h4>
                      <div className="flex items-center gap-3 text-slate-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>{c.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>{c.timeSlot}</span>
                        </span>
                      </div>
                    </div>
                    <Badge variant="success">Confirmed Slot</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
