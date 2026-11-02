"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/branding/logo";
import {
  LayoutDashboard,
  Users2,
  Calendar,
  Mail,
  Users,
  Briefcase,
  FolderKanban,
  FileText,
  MessageSquareQuote,
  Tags,
  Send,
  Settings,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/firebase/auth-context";

const NAV_GROUPS = [
  {
    title: "Intelligence & Growth",
    links: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
      { name: "Leads & Inquiries", href: "/admin/leads", icon: Users2 },
      { name: "Consultations", href: "/admin/consultations", icon: Calendar },
      { name: "Contact Messages", href: "/admin/messages", icon: Mail },
    ],
  },
  {
    title: "Audience & Subscribers",
    links: [
      { name: "Newsletter Subs", href: "/admin/newsletter", icon: Send },
      { name: "Registered Accounts", href: "/admin/users", icon: Users },
    ],
  },
  {
    title: "CMS Content Manager",
    links: [
      { name: "Services", href: "/admin/cms/services", icon: Briefcase },
      { name: "Portfolio Studies", href: "/admin/cms/portfolio", icon: FolderKanban },
      { name: "Blog Posts", href: "/admin/cms/blog", icon: FileText },
      { name: "Testimonials", href: "/admin/cms/testimonials", icon: MessageSquareQuote },
      { name: "Service Packages", href: "/admin/cms/pricing", icon: Tags },
    ],
  },
  {
    title: "System",
    links: [
      { name: "Site Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (b: boolean) => void;
}) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 shadow-sm ${
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full overflow-y-auto p-4 custom-scrollbar">
        {/* Brand Header */}
        <div className="pb-5 mb-4 border-b border-slate-100 flex items-center justify-between">
          <Logo showTagline={false} size="sm" />
          <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-200/60">
            Console
          </span>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-6 flex-1">
          {NAV_GROUPS.map((group, idx) => (
            <div key={idx}>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-2 font-semibold">
                {group.title}
              </h4>
              <ul className="space-y-1">
                {group.links.map((link) => {
                  const isActive =
                    link.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(link.href);
                  const Icon = link.icon;

                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen && setMobileOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200/60"
          >
            <span>Live Public Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
          </Link>

          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
