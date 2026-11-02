"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white border border-rose-200 shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-6 border border-rose-200">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">
          An Unexpected Error Occurred
        </h1>

        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          Our telemetry has logged this event. Try reloading the application view.
        </p>

        <Button onClick={() => reset()} className="w-full font-bold">
          <RefreshCcw className="w-4 h-4 mr-2" />
          <span>Reload Application</span>
        </Button>
      </div>
    </div>
  );
}
