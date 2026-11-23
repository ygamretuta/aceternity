"use client";

import { motion } from "motion/react";
import { formatPercent } from "../format";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** A ring that fills to this repository's share of the year's commits. */
export function CommitShareRing({ share, className }: { share: number; className?: string }) {
  return (
    <div className="relative size-14 shrink-0" title="Share of all your commits this year">
      <svg viewBox="0 0 44 44" className="size-full -rotate-90" aria-hidden>
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-white/10"
        />
        <motion.circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          whileInView={{ strokeDashoffset: CIRCUMFERENCE * (1 - share) }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={className}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {formatPercent(share)}
      </span>
    </div>
  );
}
