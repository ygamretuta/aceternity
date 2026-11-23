import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { describeYearChange, formatNumber } from "../format";
import type { WrappedData } from "../types";
import { Reveal } from "./reveal";

export function PersonalitySection({ data }: { data: WrappedData }) {
  const change = describeYearChange(data.commits, data.previousYearCommits, data.year - 1);

  return (
    <AuroraBackground className="px-6 text-center text-white dark:text-white">
      <Reveal className="flex flex-col items-center gap-6">
        <p className="text-stage-muted">Your developer personality</p>
        <h2 className="text-5xl font-bold tracking-tight md:text-7xl">{data.personality.title}</h2>
        <p className="max-w-lg text-lg text-stage-muted">{data.personality.description}</p>
        {change && (
          <p className="rounded-full bg-white/10 px-4 py-2 text-sm">
            {formatNumber(data.commits)} commits, {change}
          </p>
        )}
      </Reveal>
    </AuroraBackground>
  );
}
