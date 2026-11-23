import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchYearActivity, GitHubRateLimitError, GitHubUserNotFoundError } from "./github";

const fetchMock = vi.fn();

function respondWith(body: unknown, status = 200) {
  fetchMock.mockResolvedValue({ ok: status < 400, status, json: async () => body });
}

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("GITHUB_TOKEN", "test-token");
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

const user = {
  login: "octocat",
  name: null,
  avatarUrl: "https://avatars.githubusercontent.com/u/1",
  url: "https://github.com/octocat",
  previous: { totalCommitContributions: 5 },
  contributionsCollection: {
    totalCommitContributions: 10,
    totalPullRequestContributions: 2,
    totalPullRequestReviewContributions: 3,
    totalIssueContributions: 1,
    totalRepositoriesWithContributedCommits: 1,
    contributionCalendar: {
      weeks: [{ contributionDays: [{ date: "2026-01-01", contributionCount: 4 }] }],
    },
    commitContributionsByRepository: [
      {
        contributions: { totalCount: 10 },
        repository: {
          nameWithOwner: "octocat/hello",
          url: "https://github.com/octocat/hello",
          description: null,
          stargazerCount: 7,
          primaryLanguage: { name: "Go" },
          repositoryTopics: { nodes: [{ topic: { name: "cli" } }] },
          languages: { edges: [{ size: 100, node: { name: "Go", color: null } }] },
        },
      },
    ],
  },
};

describe("fetchYearActivity", () => {
  it("maps the GraphQL response into the app's own shape", async () => {
    respondWith({ data: { user } });
    const activity = await fetchYearActivity("octocat", 2026);
    expect(activity).toMatchObject({
      login: "octocat",
      commits: 10,
      previousYearCommits: 5,
      days: [{ date: "2026-01-01", count: 4 }],
    });
    expect(activity.repositoryActivity[0].languages[0].color).toBe("#8b949e");
    expect(activity.repositoryActivity[0].topics).toEqual(["cli"]);
  });

  it("reports an unknown user", async () => {
    respondWith({ data: { user: null }, errors: [{ type: "NOT_FOUND", message: "nope" }] });
    await expect(fetchYearActivity("ghost", 2026)).rejects.toBeInstanceOf(GitHubUserNotFoundError);
  });

  it("reports GitHub rate limiting", async () => {
    respondWith({}, 403);
    await expect(fetchYearActivity("octocat", 2026)).rejects.toBeInstanceOf(GitHubRateLimitError);
  });
});
