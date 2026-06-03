"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Code2,
  GitBranch,
  Zap,
  BookOpen,
  Brain,
  Database,
  Globe,
  ChevronRight,
  type LucideProps,
} from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import type { Course } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Layers, Code2, GitBranch, Zap, BookOpen, Brain, Database, Globe,
};

// each course gets a distinct accent so the grid doesn't look like one repeated tile
const ACCENTS = [
  {
    topBorder: "rgba(99,102,241,0.7)", // indigo
    iconBg: "bg-indigo-500/10",
    iconText: "text-indigo-400",
    bar: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.35)",
    tag: "bg-indigo-500/8 text-indigo-400/70",
  },
  {
    topBorder: "rgba(245,158,11,0.7)", // amber
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    bar: "from-amber-500 to-orange-400",
    glow: "rgba(245,158,11,0.3)",
    tag: "bg-amber-500/8 text-amber-400/70",
  },
  {
    topBorder: "rgba(6,182,212,0.7)", // cyan
    iconBg: "bg-cyan-500/10",
    iconText: "text-cyan-400",
    bar: "from-cyan-500 to-sky-400",
    glow: "rgba(6,182,212,0.3)",
    tag: "bg-cyan-500/8 text-cyan-400/70",
  },
  {
    topBorder: "rgba(16,185,129,0.7)", // emerald
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    bar: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.3)",
    tag: "bg-emerald-500/8 text-emerald-400/70",
  },
];

interface CourseTileProps {
  course: Course;
  index: number;
}

export default function CourseTile({ course, index }: CourseTileProps) {
  const IconComponent = ICON_MAP[course.icon_name] ?? BookOpen;
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.article
      className="noise group relative overflow-hidden rounded-2xl border border-white/7 bg-[#0d1117]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        delay: 0.12 + index * 0.07,
      }}
      whileHover={{ scale: 1.02 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.topBorder}, transparent)` }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        style={{ boxShadow: `inset 0 0 0 1px ${accent.glow}` }}
        aria-hidden="true"
      />

      <div className="flex h-full min-h-44 flex-col p-5">
        <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${accent.iconBg}`}>
          <IconComponent size={18} className={accent.iconText} />
        </div>

        <h3 className="text-[13px] font-semibold leading-snug text-slate-200 transition-colors group-hover:text-white">
          {course.title}
        </h3>

        <div className="mt-auto pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Progress</span>
            <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${accent.tag}`}>
              <AnimatedNumber
                value={course.progress}
                formatter={(n) => `${Math.round(n)}%`}
                duration={1.4}
                delay={0.3 + index * 0.07}
              />
            </span>
          </div>
          <ProgressBar value={course.progress} color={accent.bar} />
        </div>
      </div>

      {/* opacity-based reveal keeps layout stable — no reflow on hover */}
      <div
        className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
        aria-hidden="true"
      >
        <span className="text-[11px] font-medium text-slate-300">Continue</span>
        <ChevronRight size={12} className="text-slate-400" />
      </div>
    </motion.article>
  );
}
