"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { tileVariants } from "./BentoGrid";

const WEEKS = 18;
const DAYS = 7;

function getActivityLevel(week: number, day: number): number {
  const seed = (week * 13 + day * 7 + 11) % 19;
  if (seed < 4) return 0;
  if (seed < 8) return 1;
  if (seed < 12) return 2;
  if (seed < 16) return 3;
  return 4;
}

// intentionally teal/emerald — different from the indigo palette used across the rest of the app
const LEVEL_STYLES = [
  "bg-white/4",
  "bg-emerald-900/50",
  "bg-emerald-700/60",
  "bg-emerald-500/75",
  "bg-emerald-400",
];

const DAY_LABELS = ["M", "", "W", "", "F", "", "S"];

export default function ActivityTile() {
  return (
    <motion.article
      className="noise relative overflow-hidden rounded-2xl border border-white/7 bg-[#0d1117]"
      variants={tileVariants}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)" }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.25)" }}
        aria-hidden="true"
      />

      <div className="p-5">
        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-emerald-400" />
            <h2 className="text-[13px] font-semibold text-slate-200">Activity</h2>
          </div>
          <span className="text-[11px] text-slate-500">{WEEKS} weeks</span>
        </header>

        <div className="flex gap-2">
          <div className="flex flex-col gap-[4px] pr-0.5">
            {DAY_LABELS.map((d, i) => (
              <div key={i} className="flex h-[13px] items-center">
                <span className="text-[9px] leading-none text-slate-600">{d}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-[4px]">
            {Array.from({ length: WEEKS }).map((_, wk) => (
              <div key={wk} className="flex flex-col gap-[4px]">
                {Array.from({ length: DAYS }).map((_, dy) => {
                  const level = getActivityLevel(wk, dy);
                  return (
                    <motion.div
                      key={dy}
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.15 + (wk * DAYS + dy) * 0.0018,
                        type: "spring",
                        stiffness: 380,
                        damping: 22,
                      }}
                      className={`h-[13px] w-[13px] rounded-[3px] ${LEVEL_STYLES[level]}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-end gap-1.5">
          <span className="text-[9px] text-slate-600">Less</span>
          {LEVEL_STYLES.map((cls, i) => (
            <div key={i} className={`h-2 w-2 rounded-[2px] ${cls}`} />
          ))}
          <span className="text-[9px] text-slate-600">More</span>
        </div>
      </div>
    </motion.article>
  );
}
