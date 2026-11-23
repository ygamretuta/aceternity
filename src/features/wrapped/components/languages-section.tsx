import { formatPercent } from "../format";
import type { WrappedData } from "../types";
import { GrowBar } from "./grow-bar";
import { Reveal } from "./reveal";
import { StorySection } from "./story-section";

export function LanguagesSection({ data }: { data: WrappedData }) {
  if (data.languages.length === 0) return null;

  return (
    <StorySection>
      <Reveal className="flex w-full max-w-2xl flex-col gap-10">
        <h2 className="text-3xl font-bold md:text-5xl">
          You spoke <span className="text-accent">{data.languages[0].name}</span> most
        </h2>
        <ul className="flex flex-col gap-4 text-left">
          {data.languages.map((language) => (
            <li key={language.name} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span>{language.name}</span>
                <span className="text-stage-muted">{formatPercent(language.share)}</span>
              </div>
              <div className="h-3 w-full rounded-full bg-white/10">
                <GrowBar
                  fraction={language.share}
                  orientation="horizontal"
                  color={language.color}
                  className="h-3"
                />
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </StorySection>
  );
}
