"use client";

import { motion } from "framer-motion";

export default function CoursesSkeletonGroup() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
          className="min-h-44 rounded-2xl border border-white/5 bg-[#111122]"
          aria-hidden="true"
        />
      ))}
    </>
  );
}
