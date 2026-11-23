"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { RepoKind } from "../types";

const LOOP = { repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const };

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function WebGraphic() {
  return (
    <Frame>
      <rect x="10" y="8" width="100" height="56" rx="6" />
      <path d="M10 20h100" />
      {[0, 1, 2].map((row) => (
        <motion.path
          key={row}
          d={`M20 ${32 + row * 10}h${row === 1 ? 50 : 70}`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: row * 0.3, ...LOOP }}
        />
      ))}
    </Frame>
  );
}

function MobileGraphic() {
  return (
    <Frame>
      <rect x="40" y="4" width="40" height="64" rx="8" />
      <path d="M54 10h12" />
      <motion.circle
        cx="60"
        cy="38"
        r="8"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </Frame>
  );
}

function DataGraphic() {
  const heights = [24, 40, 30, 52, 36];
  return (
    <Frame>
      {heights.map((height, index) => (
        <motion.rect
          key={index}
          x={16 + index * 20}
          y={64 - height}
          width="12"
          height={height}
          rx="3"
          style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
          animate={{ scaleY: [0.3, 1, 0.5] }}
          transition={{ duration: 2.4, delay: index * 0.2, ...LOOP }}
        />
      ))}
    </Frame>
  );
}

function AiGraphic() {
  const nodes = [
    [20, 18],
    [20, 54],
    [60, 10],
    [60, 36],
    [60, 62],
    [100, 36],
  ];
  return (
    <Frame>
      {nodes
        .slice(0, 2)
        .flatMap(([x1, y1]) =>
          nodes
            .slice(2, 5)
            .map(([x2, y2]) => (
              <path
                key={`${x1}${y1}${x2}${y2}`}
                d={`M${x1} ${y1}L${x2} ${y2}`}
                strokeWidth="1"
                opacity="0.4"
              />
            )),
        )}
      {nodes.slice(2, 5).map(([x, y]) => (
        <path key={`o${y}`} d={`M${x} ${y}L100 36`} strokeWidth="1" opacity="0.4" />
      ))}
      {nodes.map(([x, y], index) => (
        <motion.circle
          key={`${x}${y}`}
          cx={x}
          cy={y}
          r="5"
          animate={{ scale: [1, 1.4, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{ duration: 1.8, delay: index * 0.25, repeat: Infinity }}
        />
      ))}
    </Frame>
  );
}

function GameGraphic() {
  const cells = Array.from({ length: 18 }, (_, index) => index);
  return (
    <Frame>
      {cells.map((index) => (
        <motion.rect
          key={index}
          x={12 + (index % 6) * 16}
          y={12 + Math.floor(index / 6) * 18}
          width="12"
          height="12"
          rx="2"
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: 1.6, delay: ((index * 7) % 18) * 0.12, repeat: Infinity }}
        />
      ))}
    </Frame>
  );
}

function CliGraphic() {
  return (
    <Frame>
      <rect x="8" y="8" width="104" height="56" rx="6" />
      <path d="M20 26l8 6-8 6" />
      <motion.path
        d="M36 38h40"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ...LOOP }}
      />
      <motion.path
        d="M82 28v12"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </Frame>
  );
}

function FinanceGraphic() {
  return (
    <Frame>
      <path d="M10 62h100M10 10v52" opacity="0.3" />
      <motion.path
        d="M14 54l20-14 16 8 22-26 18 12 18-18"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
      />
    </Frame>
  );
}

function DesignGraphic() {
  const colors = ["#f472b6", "#fbbf24", "#34d399", "#60a5fa"];
  return (
    <Frame>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 36px" }}
      >
        {colors.map((color, index) => (
          <circle
            key={color}
            cx={60 + Math.cos((index * Math.PI) / 2) * 16}
            cy={36 + Math.sin((index * Math.PI) / 2) * 16}
            r="14"
            fill={color}
            fillOpacity="0.55"
            stroke="none"
          />
        ))}
      </motion.g>
    </Frame>
  );
}

function CodeGraphic() {
  return (
    <Frame>
      <motion.path
        d="M44 18L24 36l20 18"
        animate={{ x: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M76 18l20 18-20 18"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <path d="M66 14L54 58" opacity="0.5" />
    </Frame>
  );
}

const GRAPHICS: Record<RepoKind, () => ReactNode> = {
  web: WebGraphic,
  mobile: MobileGraphic,
  data: DataGraphic,
  ai: AiGraphic,
  game: GameGraphic,
  cli: CliGraphic,
  finance: FinanceGraphic,
  design: DesignGraphic,
  code: CodeGraphic,
};

/** A small animated picture that suggests what kind of project a repository is. */
export function RepoGraphic({ kind }: { kind: RepoKind }) {
  const Graphic = GRAPHICS[kind];
  return <Graphic />;
}
