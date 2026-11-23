import { IconBug, IconCalendarWeek, IconEye, IconGitPullRequest } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { GlowingEffect } from "@/components/aceternity/glowing-effect";
import type { WrappedData } from "../types";
import { CountUp } from "./count-up";
import { Reveal } from "./reveal";
import { StorySection } from "./story-section";

type Stat = {
  label: string;
  value: number;
  unit: "count" | "percent";
  icon: ReactNode;
};

function buildStats(data: WrappedData): Stat[] {
  return [
    {
      label: "Pull requests",
      value: data.pullRequests,
      unit: "count",
      icon: <IconGitPullRequest className="size-5" />,
    },
    { label: "Reviews", value: data.reviews, unit: "count", icon: <IconEye className="size-5" /> },
    { label: "Issues", value: data.issues, unit: "count", icon: <IconBug className="size-5" /> },
    {
      label: "Weekend commits",
      value: data.weekendShare,
      unit: "percent",
      icon: <IconCalendarWeek className="size-5" />,
    },
  ];
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <li className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
      <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} />
      <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent">
        {stat.icon}
      </div>
      <CountUp
        to={stat.value}
        unit={stat.unit}
        className="block text-4xl font-bold tabular-nums md:text-5xl"
      />
      <p className="mt-1 text-sm text-stage-muted">{stat.label}</p>
    </li>
  );
}

export function ActivitySection({ data }: { data: WrappedData }) {
  return (
    <StorySection className="min-h-0 py-16">
      <Reveal className="w-full max-w-5xl">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {buildStats(data).map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </ul>
      </Reveal>
    </StorySection>
  );
}
