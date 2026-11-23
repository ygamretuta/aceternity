import Image from "next/image";
import type { WrappedData } from "../types";
import { Reveal } from "./reveal";
import { StorySection } from "./story-section";

export function IntroSection({ data }: { data: WrappedData }) {
  return (
    <StorySection id="top">
      <Reveal className="flex flex-col items-center gap-6">
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
        <p className="text-stage-muted">Scroll to see how it went</p>
      </Reveal>
    </StorySection>
  );
}
