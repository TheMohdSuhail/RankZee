"use client";

import React from "react";
import { useAuth } from "@/lib/firebase/auth-context";
import { Menu, ShieldCheck, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminHeader({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const { user, profile, signOut } = useAuth();

  return (
    <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 hidden sm:inline-block font-semibold">
          RankZee Operations Console
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="neon" className="text-xs gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Role: Admin</span>
        </Badge>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-xs">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">
              {user?.displayName || "Admin Owner"}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[150px]">
              {user?.email || "Lead Operations"}
            </p>
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Sign Out of Admin Console"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
