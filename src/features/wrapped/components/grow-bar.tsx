"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type GrowBarProps = {
  /** 0 to 1: how much of the track the bar fills. */
  fraction: number;
  orientation: "horizontal" | "vertical";
  color?: string;
  className?: string;
};

/** A bar that grows into view when scrolled to. */
export function GrowBar({ fraction, orientation, color, className }: GrowBarProps) {
  const isHorizontal = orientation === "horizontal";
  return (
    <motion.div
      className={cn("rounded-full bg-accent", className)}
      style={{
        backgroundColor: color,
        [isHorizontal ? "width" : "height"]: `${Math.max(fraction, 0.02) * 100}%`,
        transformOrigin: isHorizontal ? "left" : "bottom",
      }}
      initial={isHorizontal ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={isHorizontal ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}
