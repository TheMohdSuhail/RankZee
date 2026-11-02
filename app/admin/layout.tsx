"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/firebase/auth-context";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Loader2, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDev = process.env.NODE_ENV === "development";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-600 font-mono">Verifying Admin Access Credentials...</p>
        </div>
      </div>
    );
  }

  // Admin access check
  const isAllowed = isAdmin || (isDev && user);

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 text-center shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-heading font-bold text-slate-900 mb-2">
            Restricted Admin Area
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            Access to this console requires verified administrator privileges to view customer leads and inquiries.
          </p>

          <div className="space-y-3">
            <Link href="/admin/login" className="w-full block">
              <Button size="sm" className="w-full font-bold">
                <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                <span>Sign In to Admin Console</span>
              </Button>
            </Link>
            <Link href="/" className="w-full block">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                <span>Return to Public Website</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sidebar for Desktop & Mobile Drawer */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
