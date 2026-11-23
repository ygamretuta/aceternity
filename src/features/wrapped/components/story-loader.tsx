"use client";

import { MultiStepLoader } from "@/components/aceternity/multi-step-loader";

const LOADING_STATES = [
  { text: "Fetching your repos…" },
  { text: "Counting commits…" },
  { text: "Reading your pull requests…" },
  { text: "Measuring your streaks…" },
  { text: "Picking your personality…" },
];

export function StoryLoader() {
  return (
    <div className="dark min-h-screen bg-stage">
      <MultiStepLoader loadingStates={LOADING_STATES} loading duration={1200} />
    </div>
  );
}
