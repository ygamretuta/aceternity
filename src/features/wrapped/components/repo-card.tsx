"use client";

import { IconArrowUpRight, IconStar } from "@tabler/icons-react";
import { CardBody, CardContainer, CardItem } from "@/components/aceternity/3d-card";
import { GlowingEffect } from "@/components/aceternity/glowing-effect";
import { cn } from "@/lib/utils";
import { formatNumber } from "../format";
import type { TopRepo } from "../types";
import { CommitShareRing } from "./commit-share-ring";
import { RepoGraphic } from "./repo-graphics";
import { REPO_KIND_STYLES } from "./repo-kinds";

const MAX_LEGEND_LANGUAGES = 3;

export function RepoCard({ repo }: { repo: TopRepo }) {
  const { label, Icon, text, panel } = REPO_KIND_STYLES[repo.kind];
  const [owner, name] = repo.nameWithOwner.split("/");

  return (
    <CardContainer containerClassName="py-0" className="w-full">
      <CardBody className="group/card relative h-auto w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
        <GlowingEffect
          disabled={false}
          glow
          spread={40}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />

        <CardItem
          translateZ={60}
          className={cn("mb-4 h-28 w-full rounded-xl bg-gradient-to-br p-4", panel, text)}
        >
          <RepoGraphic kind={repo.kind} />
        </CardItem>

        <CardItem
          translateZ={30}
          className={cn("mb-2 flex items-center gap-2 text-xs font-medium", text)}
        >
          <Icon className="size-4" />
          {label}
        </CardItem>

        <CardItem translateZ={50} className="w-full">
          <h3 className="truncate text-lg font-semibold">
            <span className="text-stage-muted">{owner}/</span>
            {name}
          </h3>
        </CardItem>

        <CardItem translateZ={20} className="mt-1 w-full">
          <p className="line-clamp-2 min-h-10 text-sm text-stage-muted">
            {repo.description ?? "No description. The commits speak for themselves."}
          </p>
        </CardItem>

        {repo.languages.length > 0 && (
          <CardItem translateZ={30} className="mt-4 w-full">
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
              {repo.languages.map((language) => (
                <div
                  key={language.name}
                  style={{ width: `${language.share * 100}%`, backgroundColor: language.color }}
                />
              ))}
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-3 text-xs text-stage-muted">
              {repo.languages.slice(0, MAX_LEGEND_LANGUAGES).map((language) => (
                <li key={language.name} className="flex items-center gap-1">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: language.color }}
                  />
                  {language.name}
                </li>
              ))}
            </ul>
          </CardItem>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <CardItem translateZ={40} className="flex items-center gap-3">
            <CommitShareRing share={repo.yearShare} className={text} />
            <div>
              <p className="text-xl font-bold">{formatNumber(repo.commits)}</p>
              <p className="text-xs text-stage-muted">commits</p>
            </div>
          </CardItem>
          <CardItem translateZ={40} className="flex items-center gap-1 text-sm text-stage-muted">
            <IconStar className="size-4" />
            {formatNumber(repo.stars)}
          </CardItem>
        </div>

        <CardItem
          as="a"
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          translateZ={70}
          className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs opacity-0 backdrop-blur transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100"
        >
          Open <IconArrowUpRight className="size-3" />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
