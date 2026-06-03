"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

interface BentoGridProps {
  children: React.ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </motion.div>
  );
}
