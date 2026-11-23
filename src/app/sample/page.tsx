import type { Metadata } from "next";
import { WrappedStory } from "@/features/wrapped/components/wrapped-story";
import { SAMPLE_WRAPPED } from "@/features/wrapped/sample";

export const metadata: Metadata = { title: "Sample story" };

export default function SamplePage() {
  return <WrappedStory data={SAMPLE_WRAPPED} />;
}
