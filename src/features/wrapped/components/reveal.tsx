"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const REVEAL_OFFSET_PX = 24;

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: REVEAL_OFFSET_PX }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
