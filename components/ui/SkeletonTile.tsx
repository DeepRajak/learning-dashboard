"use client";

import { motion } from "framer-motion";

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-xl bg-[#111122] ${className ?? ""}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function SkeletonTile() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-4 p-4 md:p-6">
      <SkeletonBlock className="h-52 w-full md:col-span-2" />

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-44" />
        ))}
      </div>

      <SkeletonBlock className="h-56 w-full" />
    </div>
  );
}
