"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatNumber, formatPercent } from "../format";

const COUNT_UP_SECONDS = 1.6;

const FORMATTERS = {
  count: (value: number) => formatNumber(Math.round(value)),
  percent: formatPercent,
};

type CountUpProps = {
  to: number;
  unit: keyof typeof FORMATTERS;
  className?: string;
};

/** Counts from 0 to a number once it scrolls into view. */
export function CountUp({ to, unit, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: COUNT_UP_SECONDS,
      ease: "easeOut",
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [isInView, to]);

  return (
    <span ref={ref} className={className}>
      {FORMATTERS[unit](value)}
    </span>
  );
}
