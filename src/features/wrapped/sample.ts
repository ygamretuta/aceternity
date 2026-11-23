import type { WrappedData } from "./types";

/** Fixed example used by the /sample page, so the story can be previewed without a GitHub token. */
export const SAMPLE_WRAPPED: WrappedData = {
  year: 2026,
  login: "octocat",
  name: "The Octocat",
  avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
  profileUrl: "https://github.com/octocat",
  commits: 1284,
  pullRequests: 142,
  reviews: 96,
  issues: 37,
  repositories: 18,
  previousYearCommits: 1042,
  activeDays: 241,
  longestStreak: 23,
  weekendShare: 0.28,
  months: [96, 88, 142, 120, 101, 76, 64, 132, 180, 150, 98, 77].map((contributions, month) => ({
    month,
    contributions,
  })),
  busiestMonth: { month: 8, contributions: 180 },
  topRepos: [
    {
      nameWithOwner: "octocat/hello-world",
      url: "https://github.com/octocat/hello-world",
      description: "My first repository on GitHub",
      stars: 2400,
      commits: 412,
      language: "TypeScript",
      kind: "web",
      yearShare: 0.32,
      languages: [
        { name: "TypeScript", color: "#3178c6", share: 0.8 },
        { name: "CSS", color: "#663399", share: 0.2 },
      ],
    },
    {
      nameWithOwner: "octocat/spoon-knife",
      url: "https://github.com/octocat/Spoon-Knife",
      description: "This repo is for demonstration purposes only",
      stars: 12000,
      commits: 288,
      language: "Rust",
      kind: "cli",
      yearShare: 0.22,
      languages: [{ name: "Rust", color: "#dea584", share: 1 }],
    },
    {
      nameWithOwner: "octocat/linguist",
      url: "https://github.com/octocat/linguist",
      description: "Language savant",
      stars: 530,
      commits: 201,
      language: "Ruby",
      kind: "data",
      yearShare: 0.16,
      languages: [
        { name: "Ruby", color: "#701516", share: 0.7 },
        { name: "Go", color: "#00add8", share: 0.3 },
      ],
    },
  ],
  languages: [
    { name: "TypeScript", color: "#3178c6", share: 0.46 },
    { name: "Rust", color: "#dea584", share: 0.22 },
    { name: "Ruby", color: "#701516", share: 0.14 },
    { name: "Go", color: "#00add8", share: 0.1 },
    { name: "Python", color: "#3572a5", share: 0.08 },
  ],
  personality: {
    title: "The Polyglot",
    description:
      "Your commits spread across many languages. You pick the right tool, not the usual one.",
  },
};
