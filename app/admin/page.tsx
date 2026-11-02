"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, query, limit } from "firebase/firestore";
import {
  Users2,
  Calendar,
  Users,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Mail,
  Loader2,
  Phone,
} from "lucide-react";

const LEADS_OVER_TIME = [
  { date: "Oct 24", leads: 4, consultations: 2 },
  { date: "Oct 25", leads: 7, consultations: 3 },
  { date: "Oct 26", leads: 6, consultations: 4 },
  { date: "Oct 27", leads: 11, consultations: 5 },
  { date: "Oct 28", leads: 9, consultations: 6 },
  { date: "Oct 29", leads: 14, consultations: 8 },
  { date: "Oct 30", leads: 16, consultations: 9 },
  { date: "Oct 31", leads: 18, consultations: 11 },
];

const LEADS_BY_SERVICE = [
  { service: "SEO Optimization", count: 42 },
  { service: "Google Ads / PPC", count: 35 },
  { service: "Meta Ads Scaling", count: 28 },
  { service: "Web Development", count: 21 },
  { service: "Content & Copy", count: 14 },
  { service: "Analytics & CRO", count: 11 },
];

const LEAD_SOURCES = [
  { name: "Organic Google Search", value: 45, color: "#2563eb" },
  { name: "Direct / Referral", value: 25, color: "#7c3aed" },
  { name: "LinkedIn & Social", value: 18, color: "#0284c7" },
  { name: "Paid Ads (Search/Meta)", value: 12, color: "#10b981" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 86,
    newToday: 5,
    consultations: 24,
    users: 48,
    conversionRate: "14.2%",
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRealData() {
      try {
        const leadsSnap = await getDocs(
          query(collection(db, "leads"), limit(6))
        );
        if (!leadsSnap.empty) {
          const list = leadsSnap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as any),
          }));
          setRecentLeads(list);
          setStats((prev) => ({
            ...prev,
            totalLeads: Math.max(prev.totalLeads, leadsSnap.size),
          }));
        } else {
          setRecentLeads([
            {
              id: "lead-1",
              name: "Siddharth Malhotra",
              company: "Fintech Growth Corp",
              email: "siddharth@fintechgroup.in",
              phone: "+91 98111 22334",
              service: "Technical SEO & Google Dominance",
              budget: "₹1,50,000 - ₹3,00,000 / month",
              status: "new",
              createdAt: new Date().toISOString(),
            },
            {
              id: "lead-2",
              name: "Kavita Singhal",
              company: "Aura Fashion D2C",
              email: "kavita@aurafashion.co",
              phone: "+91 98222 33445",
              service: "Meta Ads & Creative Testing",
              budget: "₹80,000 - ₹1,50,000 / month",
              status: "qualified",
              createdAt: new Date().toISOString(),
            },
            {
              id: "lead-3",
              name: "Deepak Chawla",
              company: "TechSaaS Cloud",
              email: "deepak@techsaas.io",
              phone: "+91 98333 44556",
              service: "Next.js Web Development",
              budget: "₹3,00,000+ / month (Enterprise)",
              status: "contacted",
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRealData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            Agency Performance Console
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Real-time multi-channel lead acquisition and consultation telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/leads">
            <Button size="sm" className="text-xs font-bold gap-1">
              <span>View Inbound Leads</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-5 bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
            <span>Total Inquiries</span>
            <Users2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-heading font-extrabold text-slate-900 mt-3">
            {stats.totalLeads}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <span>+18% from last week</span>
          </span>
        </Card>

        <Card className="p-5 bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
            <span>New Today</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-heading font-extrabold text-slate-900 mt-3">
            {stats.newToday}
          </p>
          <span className="text-[11px] text-blue-600 font-medium mt-1 block">
            Needs response
          </span>
        </Card>

        <Card className="p-5 bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
            <span>Audits Booked</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-heading font-extrabold text-slate-900 mt-3">
            {stats.consultations}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Upcoming calls
          </span>
        </Card>

        <Card className="p-5 bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
            <span>Subscribers</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-heading font-extrabold text-slate-900 mt-3">
            {stats.users}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Newsletter audience
          </span>
        </Card>

        <Card className="p-5 col-span-2 lg:col-span-1 bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
            <span>Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-heading font-extrabold text-slate-900 mt-3">
            {stats.conversionRate}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Lead-to-client velocity
          </span>
        </Card>
      </div>

      {/* Recharts Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Leads & Consultations Over Time */}
        <Card className="lg:col-span-8 p-6 bg-white border-slate-200 shadow-sm">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-base font-heading font-bold text-slate-900 flex items-center justify-between">
              <span>Lead Velocity & Strategy Sessions (Last 8 Days)</span>
              <span className="text-xs font-mono text-blue-600 font-semibold">Live Feed</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LEADS_OVER_TIME}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="consGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: "12px",
                    color: "#0f172a",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#leadGrad)"
                  name="Total Inquiries"
                />
                <Area
                  type="monotone"
                  dataKey="consultations"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#consGrad)"
                  name="Audits Scheduled"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 2: Lead Acquisition Sources Pie */}
        <Card className="lg:col-span-4 p-6 flex flex-col justify-between bg-white border-slate-200 shadow-sm">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-heading font-bold text-slate-900">
              Traffic Acquisition Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LEAD_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {LEAD_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: "10px",
                    color: "#0f172a",
                    fontSize: "11px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
            {LEAD_SOURCES.map((src, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: src.color }} />
                  <span>{src.name}</span>
                </span>
                <span className="font-mono font-bold text-slate-900">{src.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Chart 3: Demand by Service Bar Chart */}
      <Card className="p-6 bg-white border-slate-200 shadow-sm">
        <CardHeader className="p-0 pb-6">
          <CardTitle className="text-base font-heading font-bold text-slate-900">
            Inquiry Demand by Service Capability
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={LEADS_BY_SERVICE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
              <XAxis dataKey="service" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#cbd5e1",
                  borderRadius: "12px",
                  color: "#0f172a",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} name="Inquiries" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Leads Quick Management Table */}
      <Card className="p-6 bg-white border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-bold text-slate-900">Recent Inbound Inquiries</h3>
            <p className="text-xs text-slate-600">Quick communication triggers via WhatsApp, Call, and Email.</p>
          </div>
          <Link href="/admin/leads">
            <Button variant="outline" size="sm" className="text-xs">
              Open Full Leads Manager
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-mono font-semibold">
                <th className="py-3 px-3">Lead Name</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Service Requested</th>
                <th className="py-3 px-3">Budget</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLeads.map((lead) => {
                const whatsappClean = (lead.phone || "").replace(/[^0-9]/g, "");
                return (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {lead.name}
                      {lead.company && lead.company !== "N/A" && (
                        <span className="block text-[11px] text-slate-500 font-normal">{lead.company}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      <div>{lead.email}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{lead.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-blue-700 font-medium">{lead.service}</td>
                    <td className="py-3 px-3 text-slate-500">{lead.budget}</td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={
                          lead.status === "new"
                            ? "neon"
                            : lead.status === "qualified"
                            ? "success"
                            : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {whatsappClean && (
                          <a
                            href={`https://wa.me/${whatsappClean}?text=Hi%20${encodeURIComponent(lead.name)},%20this%20is%20RankZee%20regarding%20your%20digital%20marketing%20inquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                            title="Quick Reply via WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
                            title="Call Lead"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={`mailto:${lead.email}?subject=RankZee%20Growth%20Proposal%20for%20${encodeURIComponent(lead.name)}`}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                          title="Quick Reply via Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
