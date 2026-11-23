import Image from "next/image";
import { Suspense } from "react";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { formatNumber } from "../format";
import type { WrappedData } from "../types";
import { Reveal } from "./reveal";
import { StorySection } from "./story-section";

export function IntroSection({ data }: { data: WrappedData }) {
  return (
    <StorySection id="top">
      {/* The beams use Math.random, so they render at request time instead of prerender. */}
      <Suspense>
        <BackgroundBeams />
      </Suspense>
      <Reveal className="relative z-10 flex flex-col items-center gap-6">
        <Image
          src={data.avatarUrl}
          alt={`${data.login}'s avatar`}
          width={128}
          height={128}
          className="rounded-full ring-4 ring-accent"
          priority
        />
        <p className="text-stage-muted">@{data.login}</p>
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          Your {data.year}
          <br />
          <span className="text-accent">on GitHub</span>
        </h1>
        <TextGenerateEffect
          words={`You pushed ${formatNumber(data.commits)} commits`}
          className="text-2xl font-bold md:text-4xl"
        />
        <p className="max-w-md text-stage-muted">
          Across {formatNumber(data.repositories)} repositories, on {formatNumber(data.activeDays)}{" "}
          different days.
        </p>
      </Reveal>
    </StorySection>
  );
}
