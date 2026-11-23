import { getSiteUrl } from "@/lib/site";
import type { WrappedData } from "../types";
import { ActivitySection } from "./activity-section";
import { IntroSection } from "./intro-section";
import { LanguagesSection } from "./languages-section";
import { PersonalitySection } from "./personality-section";
import { ShareDock } from "./share-dock";
import { TimelineSection } from "./timeline-section";
import { TopReposSection } from "./top-repos-section";

export function WrappedStory({ data }: { data: WrappedData }) {
  const shareUrl = `${getSiteUrl()}/u/${data.login}`;

  return (
    <div className="dark bg-stage text-stage-foreground">
      <IntroSection data={data} />
      <ActivitySection data={data} />
      <TopReposSection data={data} />
      <LanguagesSection data={data} />
      <TimelineSection data={data} />
      <PersonalitySection data={data} />
      <ShareDock data={data} shareUrl={shareUrl} />
    </div>
  );
}
