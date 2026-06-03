"use client";

import { motion } from "framer-motion";
import { Flame, Star, Zap, Trophy } from "lucide-react";
import { tileVariants } from "./BentoGrid";

interface Badge {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  desc: string;
  earned: boolean;
  style: string;
}

const BADGES: Badge[] = [
  {
    icon: Flame,
    label: "7-Day Streak",
    desc: "7 days in a row",
    earned: true,
    style: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Star,
    label: "First 1000 XP",
    desc: "Earned 1,000 XP",
    earned: true,
    style: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Zap,
    label: "Speed Learner",
    desc: "Finish in record time",
    earned: false,
    style: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Trophy,
    label: "Course Complete",
    desc: "Finish any course",
    earned: false,
    style: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
];

export default function AchievementsTile() {
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
        style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)" }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ boxShadow: "inset 0 0 0 1px rgba(245,158,11,0.22)" }}
        aria-hidden="true"
      />

      <div className="p-5">
        <header className="mb-4 flex items-center gap-2">
          <Trophy size={14} className="text-amber-400" />
          <h2 className="text-[13px] font-semibold text-slate-200">Achievements</h2>
        </header>

        <div className="grid grid-cols-2 gap-2.5">
          {BADGES.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                  delay: 0.2 + i * 0.08,
                }}
                className={`flex flex-col gap-2 rounded-xl border p-3 ${b.style} ${
                  !b.earned ? "opacity-40 grayscale" : ""
                }`}
              >
                <Icon size={15} />
                <div>
                  <p className="text-[11px] font-semibold leading-tight text-slate-200">
                    {b.label}
                  </p>
                  <p className="text-[10px] text-slate-500">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
