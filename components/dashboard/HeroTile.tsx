"use client";

import { motion } from "framer-motion";
import { Flame, Star, TrendingUp } from "lucide-react";
import { tileVariants } from "./BentoGrid";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import ProgressBar from "@/components/ui/ProgressBar";

const STREAK_DAYS = 12;
const WEEK_ACTIVITY = [true, true, true, false, true, true, false];
const XP_TOTAL = 4820;
const LEVEL_THRESHOLDS = [0, 500, 1500, 3500, 7000, 12000];
const LEVEL_TITLES = ["Beginner", "Explorer", "Apprentice", "Practitioner", "Expert", "Master"];

function getLevelInfo(xp: number) {
  let lvl = 0;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { lvl = i; break; }
  }
  const next = LEVEL_THRESHOLDS[lvl + 1] ?? LEVEL_THRESHOLDS.at(-1)!;
  const current = xp - LEVEL_THRESHOLDS[lvl];
  const needed = next - LEVEL_THRESHOLDS[lvl];
  return {
    level: lvl + 1,
    title: LEVEL_TITLES[lvl],
    progressPct: Math.round((current / needed) * 100),
    current,
    needed,
  };
}

export default function HeroTile() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const levelInfo = getLevelInfo(XP_TOTAL);

  return (
    <motion.article
      className="noise relative col-span-1 overflow-hidden rounded-2xl border border-white/8 bg-[#0d1117] lg:col-span-2"
      variants={tileVariants}
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #6366f1 30%, #06b6d4 70%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute right-0 top-0 h-40 w-56 opacity-30"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at 100% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ boxShadow: "inset 0 0 0 1px rgba(99,102,241,0.3)" }}
        aria-hidden="true"
      />

      <div className="flex flex-col p-6 md:p-7">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
            {greeting}
          </span>
          <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight text-slate-50">
            Welcome back,{" "}
            <span className="text-indigo-400">Deep</span>
            <span className="ml-3 inline-flex items-center rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-0.5 align-middle text-xs font-semibold text-indigo-300">
              Lv {levelInfo.level} · {levelInfo.title}
            </span>
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            3 courses in progress &mdash; you&apos;re on a roll.
          </p>
          <div className="mt-3 max-w-[280px]">
            <p className="mb-1.5 text-[10px] text-slate-600">
              {levelInfo.current.toLocaleString()} / {levelInfo.needed.toLocaleString()} XP to Lv {levelInfo.level + 1}
            </p>
            <ProgressBar value={levelInfo.progressPct} color="from-indigo-500 to-violet-500" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-orange-500/15 bg-orange-500/8 px-4 py-3">
            <Flame size={16} className="shrink-0 text-orange-400" />
            <div>
              <p className="text-[11px] text-orange-400/60">Daily streak</p>
              <p className="text-xl font-bold leading-none text-orange-300">
                <AnimatedNumber value={STREAK_DAYS} duration={1.2} delay={0.2} />
                <span className="ml-0.5 text-xs font-normal text-orange-400/50"> days</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-indigo-500/15 bg-indigo-500/8 px-4 py-3">
            <Star size={16} className="shrink-0 text-indigo-400" />
            <div>
              <p className="text-[11px] text-indigo-400/60">Total XP</p>
              <p className="text-xl font-bold leading-none text-indigo-300">
                <AnimatedNumber
                  value={XP_TOTAL}
                  formatter={(n) => Math.round(n).toLocaleString()}
                  duration={1.4}
                  delay={0.25}
                />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-cyan-500/15 bg-cyan-500/8 px-4 py-3">
            <TrendingUp size={16} className="shrink-0 text-cyan-400" />
            <div>
              <p className="text-[11px] text-cyan-400/60">This week</p>
              <p className="text-xl font-bold leading-none text-cyan-300">
                <AnimatedNumber
                  value={340}
                  formatter={(n) => `+${Math.round(n)}`}
                  duration={1.2}
                  delay={0.3}
                />{" "}
                <span className="text-xs font-normal text-cyan-400/50">XP</span>
              </p>
            </div>
          </div>

          <div className="ml-auto hidden flex-col items-end gap-1.5 sm:flex">
            <span className="text-[10px] uppercase tracking-wider text-slate-600">This week</span>
            <div className="flex items-center gap-1.5">
              {WEEK_ACTIVITY.map((active, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.06, type: "spring", stiffness: 400, damping: 18 }}
                  className={`h-2 w-2 rounded-full ${active ? "bg-indigo-500" : "bg-white/8"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
