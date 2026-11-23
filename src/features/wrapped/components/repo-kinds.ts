import {
  IconBrandReact,
  IconChartBar,
  IconCode,
  IconDeviceMobile,
  IconPalette,
  IconRobot,
  IconSportBilliard,
  IconTerminal2,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import type { RepoKind } from "../types";

type RepoKindStyle = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  /** Tailwind classes, written out in full so the compiler keeps them. */
  text: string;
  panel: string;
};

export const REPO_KIND_STYLES: Record<RepoKind, RepoKindStyle> = {
  web: {
    label: "Web app",
    Icon: IconBrandReact,
    text: "text-sky-300",
    panel: "from-sky-500/25 to-transparent",
  },
  mobile: {
    label: "Mobile",
    Icon: IconDeviceMobile,
    text: "text-emerald-300",
    panel: "from-emerald-500/25 to-transparent",
  },
  data: {
    label: "Data & dashboards",
    Icon: IconChartBar,
    text: "text-amber-300",
    panel: "from-amber-500/25 to-transparent",
  },
  ai: {
    label: "AI",
    Icon: IconRobot,
    text: "text-fuchsia-300",
    panel: "from-fuchsia-500/25 to-transparent",
  },
  game: {
    label: "Game",
    Icon: IconSportBilliard,
    text: "text-rose-300",
    panel: "from-rose-500/25 to-transparent",
  },
  cli: {
    label: "Command line",
    Icon: IconTerminal2,
    text: "text-lime-300",
    panel: "from-lime-500/25 to-transparent",
  },
  finance: {
    label: "Finance",
    Icon: IconTrendingUp,
    text: "text-green-300",
    panel: "from-green-500/25 to-transparent",
  },
  design: {
    label: "Design",
    Icon: IconPalette,
    text: "text-pink-300",
    panel: "from-pink-500/25 to-transparent",
  },
  code: {
    label: "Code",
    Icon: IconCode,
    text: "text-indigo-300",
    panel: "from-indigo-500/25 to-transparent",
  },
};
