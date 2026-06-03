"use client";

import { motion } from "framer-motion";
import { tileVariants } from "./BentoGrid";

export default function SectionHeader({ label }: { label: string }) {
  return (
    <motion.div
      className="col-span-full"
      variants={tileVariants}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="inline-flex flex-col gap-1.5">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </h2>
        <div
          className="h-px w-20"
          style={{
            background:
              "linear-gradient(90deg, rgba(99,102,241,0.7), rgba(6,182,212,0.5), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}
