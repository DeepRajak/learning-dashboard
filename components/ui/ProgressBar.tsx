"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface ProgressBarProps {
  value: number;
  color?: string;
}

export default function ProgressBar({
  value,
  color = "from-violet-500 to-blue-500",
}: ProgressBarProps) {
  const progressMotion = useMotionValue(0);
  const widthPercent = useTransform(progressMotion, (v) => `${v}%`);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(progressMotion, value, {
      duration: 1.4,
      ease: "easeOut",
      delay: 0.3,
    });
    return controls.stop;
  }, [progressMotion, value]);

  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        style={{ width: widthPercent }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
      <motion.div
        style={{ width: widthPercent }}
        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${color} blur-sm opacity-60`}
      />
    </div>
  );
}
