"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  formatter?: (n: number) => string;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  formatter = (n) => Math.round(n).toString(),
  duration = 1.4,
  delay = 0,
  className,
}: AnimatedNumberProps) {
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => formatter(v));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(motionVal, value, { duration, ease: "easeOut", delay });
    return controls.stop;
  }, [motionVal, value, duration, delay]);

  return <motion.span className={className}>{display}</motion.span>;
}
