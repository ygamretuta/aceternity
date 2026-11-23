import type { WrappedData } from "../types";
import { RepoCard } from "./repo-card";
import { Reveal } from "./reveal";
import { StorySection } from "./story-section";

export function TopReposSection({ data }: { data: WrappedData }) {
  if (data.topRepos.length === 0) return null;

  return (
    <StorySection>
      <Reveal className="w-full max-w-6xl">
        <h2 className="mb-2 text-3xl font-bold md:text-5xl">Where your year went</h2>
        <p className="mb-12 text-stage-muted">
          Hover a card. Rings show each repo&apos;s share of your commits.
        </p>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.topRepos.map((repo) => (
            <li key={repo.nameWithOwner}>
              <RepoCard repo={repo} />
            </li>
          ))}
        </ul>
      </Reveal>
    </StorySection>
  );
}
