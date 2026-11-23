import { IconEye, IconGitPullRequest, IconBug, IconCalendarWeek } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { formatNumber, formatPercent } from "../format";
import type { WrappedData } from "../types";
import { Reveal } from "./reveal";
import { StorySection } from "./story-section";

function BigNumber({ value }: { value: string }) {
  return <p className="flex flex-1 items-center text-6xl font-bold text-accent">{value}</p>;
}

function buildTiles(
  data: WrappedData,
): { title: string; description: string; value: string; icon: ReactNode; className?: string }[] {
  return [
    {
      title: "Pull requests",
      description: "Changes you proposed",
      value: formatNumber(data.pullRequests),
      icon: <IconGitPullRequest className="size-5" />,
      className: "md:col-span-2",
    },
    {
      title: "Reviews",
      description: "Other people's code you read",
      value: formatNumber(data.reviews),
      icon: <IconEye className="size-5" />,
    },
    {
      title: "Issues",
      description: "Problems opened",
      value: formatNumber(data.issues),
      icon: <IconBug className="size-5" />,
    },
    {
      title: "Weekend commits",
      description: "Share of your work on Saturday and Sunday",
      value: formatPercent(data.weekendShare),
      icon: <IconCalendarWeek className="size-5" />,
      className: "md:col-span-2",
    },
  ];
}

export function ActivitySection({ data }: { data: WrappedData }) {
  return (
    <StorySection>
      <Reveal className="w-full max-w-5xl">
        <h2 className="mb-10 text-3xl font-bold md:text-5xl">More than just commits</h2>
        <BentoGrid className="text-left">
          {buildTiles(data).map((tile) => (
            <BentoGridItem
              key={tile.title}
              title={tile.title}
              description={tile.description}
              header={<BigNumber value={tile.value} />}
              icon={tile.icon}
              className={tile.className}
            />
          ))}
        </BentoGrid>
      </Reveal>
    </StorySection>
  );
}
