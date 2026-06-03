"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#07070f] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-500/20 bg-[#111122] p-8 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Something went wrong
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {error.message.includes("Missing")
              ? "Supabase environment variables are not configured."
              : "Could not load the dashboard. Please try again."}
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </motion.div>
    </div>
  );
}
