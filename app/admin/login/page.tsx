"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/firebase/auth-context";
import { Logo } from "@/components/branding/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Lock, Mail, KeyRound, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, unlockAdminSession, isAdmin, user } = useAuth();
  const { success, error } = useToast();

  const [activeTab, setActiveTab] = useState<"passcode" | "email">("passcode");
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // If already authenticated as admin, route directly
  if (isAdmin) {
    router.push("/admin");
  }

  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    const ok = unlockAdminSession(passcode);
    if (ok) {
      success("Console Access Granted", "Welcome to RankZee Master Console.");
      router.push("/admin");
    } else {
      error("Access Denied", "Incorrect administrator passkey. Please check credentials.");
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      success("Identity Confirmed", "Authenticated with Firebase Auth.");
      router.push("/admin");
    } catch (err: any) {
      error("Authentication Failed", err.message || "Invalid email or credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      success("Admin Verified", "Logged in via Google Workspace.");
      router.push("/admin");
    } catch (err: any) {
      error("Google Sign-In Error", err.message || "Failed to authenticate.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-800">
      <div className="w-full max-w-md space-y-6 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-lg">
        <div className="text-center">
          <Logo showTagline={false} size="lg" className="justify-center mb-4" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Staff & Owner Portal</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            RankZee Admin Console
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Access inbound leads, consultations, and agency performance analytics.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("passcode")}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === "passcode"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Admin Passkey
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === "email"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Email & Password
          </button>
        </div>

        {activeTab === "passcode" ? (
          <form onSubmit={handlePasscodeLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Master Admin Passkey
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="password"
                  placeholder="Enter administrator passkey"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="pl-10 h-11"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Default credentials configured for authorized agency management.
              </p>
            </div>

            <Button type="submit" className="w-full h-11 font-bold">
              Access Lead Console
            </Button>
          </form>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="email"
                  placeholder="admin@rankzee.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 font-bold">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              <span>Sign In with Firebase</span>
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full h-11 justify-center gap-2"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              )}
              <span>Google Account</span>
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

