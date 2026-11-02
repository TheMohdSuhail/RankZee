"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/branding/logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/firebase/auth-context";
import { Menu, X, ChevronRight, ShieldCheck, PhoneCall, Calendar } from "lucide-react";

const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Why RankZee", href: "/#why-us" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Growth Plans", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Don't render public header on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo showTagline={false} size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-cyan-400/20 dark:text-cyan-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Direct Call/WhatsApp + Free Consultation */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          {/* If owner is logged in as admin, show Admin shortcut */}
          {isAdmin && (
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs border-blue-400 text-blue-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </Button>
            </Link>
          )}

          <Link href="/contact" className="hidden xl:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors mr-1">
            <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
            <span>+91 98765 43210</span>
          </Link>

          <Link href="/book-consultation">
            <Button size="sm" className="text-xs shadow-md shadow-blue-600/20 font-bold bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              <span>Book Consultation</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 p-6 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
              <Link href="/book-consultation" className="w-full">
                <Button className="w-full justify-center font-bold bg-blue-600 hover:bg-blue-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Book Free Consultation</span>
                </Button>
              </Link>

              <Link href="/contact" className="w-full">
                <Button variant="outline" className="w-full justify-center text-slate-700">
                  <PhoneCall className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Contact Our Team</span>
                </Button>
              </Link>

              {user && isAdmin && (
                <Link href="/admin" className="w-full">
                  <Button variant="secondary" className="w-full justify-center gap-1.5 text-blue-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Go to Admin Panel</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
