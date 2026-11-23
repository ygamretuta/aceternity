export type MonthActivity = { month: number; contributions: number };

export type RepoKind =
  "web" | "mobile" | "data" | "ai" | "game" | "cli" | "finance" | "design" | "code";

export type LanguageShare = { name: string; color: string; share: number };

export type TopRepo = {
  nameWithOwner: string;
  url: string;
  description: string | null;
  stars: number;
  commits: number;
  language: string | null;
  kind: RepoKind;
  /** This repository's share of all the user's commits this year, 0 to 1. */
  yearShare: number;
  languages: LanguageShare[];
};

export type Personality = { title: string; description: string };

/** Everything the story needs. The UI never sees GitHub's raw API shapes. */
export type WrappedData = {
  year: number;
  login: string;
  name: string | null;
  avatarUrl: string;
  profileUrl: string;
  commits: number;
  pullRequests: number;
  reviews: number;
  issues: number;
  repositories: number;
  previousYearCommits: number;
  activeDays: number;
  longestStreak: number;
  weekendShare: number;
  months: MonthActivity[];
  busiestMonth: MonthActivity;
  topRepos: TopRepo[];
  languages: LanguageShare[];
  personality: Personality;
};
