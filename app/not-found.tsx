import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-8xl sm:text-9xl font-heading font-extrabold text-neon-gradient tracking-tighter">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
          Page Not Ranked
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          The link you requested has moved or doesn&apos;t exist. Let&apos;s get you back to high-converting territory.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto font-bold">
              <Home className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link href="/services" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              <span>Browse Services</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
