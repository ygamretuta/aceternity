import Link from "next/link";
import { FlipWords } from "@/components/aceternity/flip-words";
import { Spotlight } from "@/components/aceternity/spotlight";
import { UsernameForm } from "./username-form";

const HERO_WORDS = ["commits", "pull requests", "late-night pushes", "side projects"];

export function LandingHero() {
  return (
    <div className="dark relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-stage px-6 text-stage-foreground">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 flex w-full flex-col items-center gap-8 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Your year in
          <FlipWords words={HERO_WORDS} className="text-accent dark:text-accent" />
        </h1>
        <p className="max-w-xl text-stage-muted">
          Type any GitHub username and get a cinematic story of their coding year.
        </p>
        <UsernameForm />
        <Link
          href="/sample"
          className="text-sm text-stage-muted underline-offset-4 hover:text-stage-foreground hover:underline"
        >
          See a sample
        </Link>
      </div>
    </div>
  );
}
