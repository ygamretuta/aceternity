import { Suspense } from "react";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { formatNumber } from "../format";
import type { WrappedData } from "../types";
import { StorySection } from "./story-section";

export function CommitsSection({ data }: { data: WrappedData }) {
  return (
    <StorySection>
      {/* The beams use Math.random, so they render at request time instead of prerender. */}
      <Suspense>
        <BackgroundBeams />
      </Suspense>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <TextGenerateEffect
          words={`You pushed ${formatNumber(data.commits)} commits`}
          className="text-4xl font-bold md:text-6xl"
        />
        <p className="max-w-md text-stage-muted">
          Across {formatNumber(data.repositories)} repositories, on {formatNumber(data.activeDays)}{" "}
          different days.
        </p>
      </div>
    </StorySection>
  );
}
