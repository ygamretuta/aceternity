import { z } from "zod";
import { requireEnv } from "@/lib/env";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const TOP_REPOSITORY_COUNT = 12;
const LANGUAGES_PER_REPOSITORY = 5;

export class GitHubUserNotFoundError extends Error {
  constructor(login: string) {
    super(`GitHub user not found: ${login}`);
    this.name = "GitHubUserNotFoundError";
  }
}

export class GitHubRateLimitError extends Error {
  constructor() {
    super("GitHub rate limit reached");
    this.name = "GitHubRateLimitError";
  }
}

export type GitHubRepositoryActivity = {
  nameWithOwner: string;
  url: string;
  description: string | null;
  stars: number;
  commits: number;
  primaryLanguage: string | null;
  topics: string[];
  languages: { name: string; color: string; size: number }[];
};

export type GitHubYearActivity = {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  commits: number;
  pullRequests: number;
  reviews: number;
  issues: number;
  repositories: number;
  previousYearCommits: number;
  days: { date: string; count: number }[];
  repositoryActivity: GitHubRepositoryActivity[];
};

const QUERY = `
query Year($login: String!, $from: DateTime!, $to: DateTime!, $prevFrom: DateTime!, $prevTo: DateTime!) {
  user(login: $login) {
    login
    name
    avatarUrl
    url
    previous: contributionsCollection(from: $prevFrom, to: $prevTo) {
      totalCommitContributions
    }
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalIssueContributions
      totalRepositoriesWithContributedCommits
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
      commitContributionsByRepository(maxRepositories: ${TOP_REPOSITORY_COUNT}) {
        contributions { totalCount }
        repository {
          nameWithOwner
          url
          description
          stargazerCount
          primaryLanguage { name }
          repositoryTopics(first: 8) { nodes { topic { name } } }
          languages(first: ${LANGUAGES_PER_REPOSITORY}, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name color } }
          }
        }
      }
    }
  }
}`;

const responseSchema = z.object({
  data: z
    .object({
      user: z
        .object({
          login: z.string(),
          name: z.string().nullable(),
          avatarUrl: z.string(),
          url: z.string(),
          previous: z.object({ totalCommitContributions: z.number() }),
          contributionsCollection: z.object({
            totalCommitContributions: z.number(),
            totalPullRequestContributions: z.number(),
            totalPullRequestReviewContributions: z.number(),
            totalIssueContributions: z.number(),
            totalRepositoriesWithContributedCommits: z.number(),
            contributionCalendar: z.object({
              weeks: z.array(
                z.object({
                  contributionDays: z.array(
                    z.object({ date: z.string(), contributionCount: z.number() }),
                  ),
                }),
              ),
            }),
            commitContributionsByRepository: z.array(
              z.object({
                contributions: z.object({ totalCount: z.number() }),
                repository: z.object({
                  nameWithOwner: z.string(),
                  url: z.string(),
                  description: z.string().nullable(),
                  stargazerCount: z.number(),
                  primaryLanguage: z.object({ name: z.string() }).nullable(),
                  repositoryTopics: z.object({
                    nodes: z.array(z.object({ topic: z.object({ name: z.string() }) })),
                  }),
                  languages: z.object({
                    edges: z
                      .array(
                        z.object({
                          size: z.number(),
                          node: z.object({ name: z.string(), color: z.string().nullable() }),
                        }),
                      )
                      .nullable(),
                  }),
                }),
              }),
            ),
          }),
        })
        .nullable(),
    })
    .nullable(),
  errors: z.array(z.object({ type: z.string().optional(), message: z.string() })).optional(),
});

const DEFAULT_LANGUAGE_COLOR = "#8b949e";

/** Fetches one calendar year of public activity for a GitHub user, plus last year's commit count. */
export async function fetchYearActivity(login: string, year: number): Promise<GitHubYearActivity> {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requireEnv("GITHUB_TOKEN")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        login,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
        prevFrom: `${year - 1}-01-01T00:00:00Z`,
        prevTo: `${year - 1}-12-31T23:59:59Z`,
      },
    }),
  });

  if (response.status === 403 || response.status === 429) throw new GitHubRateLimitError();
  if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);

  const body = responseSchema.parse(await response.json());
  if (body.errors?.some((error) => error.type === "RATE_LIMITED")) throw new GitHubRateLimitError();
  if (body.errors?.some((error) => error.type === "NOT_FOUND") || !body.data?.user) {
    throw new GitHubUserNotFoundError(login);
  }

  const { user } = body.data;
  const activity = user.contributionsCollection;
  return {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatarUrl,
    url: user.url,
    commits: activity.totalCommitContributions,
    pullRequests: activity.totalPullRequestContributions,
    reviews: activity.totalPullRequestReviewContributions,
    issues: activity.totalIssueContributions,
    repositories: activity.totalRepositoriesWithContributedCommits,
    previousYearCommits: user.previous.totalCommitContributions,
    days: activity.contributionCalendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
    ),
    repositoryActivity: activity.commitContributionsByRepository.map((entry) => ({
      nameWithOwner: entry.repository.nameWithOwner,
      url: entry.repository.url,
      description: entry.repository.description,
      stars: entry.repository.stargazerCount,
      commits: entry.contributions.totalCount,
      primaryLanguage: entry.repository.primaryLanguage?.name ?? null,
      topics: entry.repository.repositoryTopics.nodes.map((node) => node.topic.name),
      languages: (entry.repository.languages.edges ?? []).map((edge) => ({
        name: edge.node.name,
        color: edge.node.color ?? DEFAULT_LANGUAGE_COLOR,
        size: edge.size,
      })),
    })),
  };
}
