import type { GitHubRepositoryActivity, GitHubYearActivity } from "@/adapters/github";
import { classifyRepo } from "./classify-repo";
import type { LanguageShare, MonthActivity, Personality, TopRepo, WrappedData } from "../types";

const MONTHS_IN_YEAR = 12;
const MAX_LANGUAGES = 6;
const SATURDAY = 6;
const SUNDAY = 0;

const REVIEWER_MIN_REVIEWS = 20;
const MARATHON_STREAK_DAYS = 30;
const WEEKEND_WARRIOR_SHARE = 0.4;
const SPRINTER_MONTH_SHARE = 0.25;
const POLYGLOT_MIN_LANGUAGES = 4;
const POLYGLOT_MIN_SHARE = 0.1;

type Day = GitHubYearActivity["days"][number];

export function buildMonths(days: Day[]): MonthActivity[] {
  const months = Array.from({ length: MONTHS_IN_YEAR }, (_, month) => ({
    month,
    contributions: 0,
  }));
  for (const day of days) months[Number(day.date.slice(5, 7)) - 1].contributions += day.count;
  return months;
}

export function findLongestStreak(days: Day[]): number {
  let longest = 0;
  let current = 0;
  for (const day of [...days].sort((a, b) => a.date.localeCompare(b.date))) {
    current = day.count > 0 ? current + 1 : 0;
    longest = Math.max(longest, current);
  }
  return longest;
}

export function calculateWeekendShare(days: Day[]): number {
  const total = days.reduce((sum, day) => sum + day.count, 0);
  if (total === 0) return 0;
  const weekend = days
    .filter((day) => {
      const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
      return weekday === SATURDAY || weekday === SUNDAY;
    })
    .reduce((sum, day) => sum + day.count, 0);
  return weekend / total;
}

/** Weights each repository's languages by how many commits went into that repository. */
export function buildLanguages(repositories: GitHubRepositoryActivity[]): LanguageShare[] {
  const weights = new Map<string, { color: string; weight: number }>();
  for (const repository of repositories) {
    const totalSize = repository.languages.reduce((sum, language) => sum + language.size, 0);
    if (totalSize === 0) continue;
    for (const language of repository.languages) {
      const entry = weights.get(language.name) ?? { color: language.color, weight: 0 };
      entry.weight += (language.size / totalSize) * repository.commits;
      weights.set(language.name, entry);
    }
  }
  const totalWeight = [...weights.values()].reduce((sum, entry) => sum + entry.weight, 0);
  if (totalWeight === 0) return [];
  return [...weights.entries()]
    .map(([name, { color, weight }]) => ({ name, color, share: weight / totalWeight }))
    .sort((a, b) => b.share - a.share)
    .slice(0, MAX_LANGUAGES);
}

const MAX_REPO_LANGUAGES = 4;

function buildTopRepos(repositories: GitHubRepositoryActivity[], totalCommits: number): TopRepo[] {
  return repositories
    .map((repository) => ({
      nameWithOwner: repository.nameWithOwner,
      url: repository.url,
      description: repository.description,
      stars: repository.stars,
      commits: repository.commits,
      language: repository.primaryLanguage,
      kind: classifyRepo({
        name: repository.nameWithOwner.split("/")[1] ?? repository.nameWithOwner,
        description: repository.description,
        topics: repository.topics,
      }),
      yearShare: totalCommits === 0 ? 0 : repository.commits / totalCommits,
      languages: buildLanguages([repository]).slice(0, MAX_REPO_LANGUAGES),
    }))
    .sort((a, b) => b.commits - a.commits);
}

type PersonalityStats = Pick<
  WrappedData,
  | "pullRequests"
  | "reviews"
  | "longestStreak"
  | "weekendShare"
  | "languages"
  | "months"
  | "busiestMonth"
>;

type PersonalityRule = Personality & { matches: (stats: PersonalityStats) => boolean };

// Checked in order; the first match wins.
const PERSONALITY_RULES: PersonalityRule[] = [
  {
    title: "The Code Reviewer",
    description: "You made other people's code better more often than you shipped your own.",
    matches: ({ reviews, pullRequests }) =>
      reviews >= REVIEWER_MIN_REVIEWS && reviews > pullRequests,
  },
  {
    title: "The Marathoner",
    description: "You showed up day after day. Consistency is your superpower.",
    matches: ({ longestStreak }) => longestStreak >= MARATHON_STREAK_DAYS,
  },
  {
    title: "The Weekend Warrior",
    description: "While everyone else rested, you were shipping.",
    matches: ({ weekendShare }) => weekendShare >= WEEKEND_WARRIOR_SHARE,
  },
  {
    title: "The Sprinter",
    description: "One month carried your year. When you go, you go all in.",
    matches: ({ months, busiestMonth }) => {
      const total = months.reduce((sum, month) => sum + month.contributions, 0);
      return total > 0 && busiestMonth.contributions / total >= SPRINTER_MONTH_SHARE;
    },
  },
  {
    title: "The Polyglot",
    description:
      "Your commits spread across many languages. You pick the right tool, not the usual one.",
    matches: ({ languages }) =>
      languages.filter((language) => language.share >= POLYGLOT_MIN_SHARE).length >=
      POLYGLOT_MIN_LANGUAGES,
  },
];

const DEFAULT_PERSONALITY: Personality = {
  title: "The Steady Shipper",
  description: "No drama, just a steady stream of work that moved projects forward.",
};

export function choosePersonality(stats: PersonalityStats): Personality {
  const rule = PERSONALITY_RULES.find((candidate) => candidate.matches(stats));
  return rule ? { title: rule.title, description: rule.description } : DEFAULT_PERSONALITY;
}

export function buildWrapped(activity: GitHubYearActivity, year: number): WrappedData {
  const months = buildMonths(activity.days);
  const busiestMonth = months.reduce((best, month) =>
    month.contributions > best.contributions ? month : best,
  );
  const languages = buildLanguages(activity.repositoryActivity);
  const longestStreak = findLongestStreak(activity.days);
  const weekendShare = calculateWeekendShare(activity.days);

  return {
    year,
    login: activity.login,
    name: activity.name,
    avatarUrl: activity.avatarUrl,
    profileUrl: activity.url,
    commits: activity.commits,
    pullRequests: activity.pullRequests,
    reviews: activity.reviews,
    issues: activity.issues,
    repositories: activity.repositories,
    previousYearCommits: activity.previousYearCommits,
    activeDays: activity.days.filter((day) => day.count > 0).length,
    longestStreak,
    weekendShare,
    months,
    busiestMonth,
    topRepos: buildTopRepos(activity.repositoryActivity, activity.commits),
    languages,
    personality: choosePersonality({
      pullRequests: activity.pullRequests,
      reviews: activity.reviews,
      longestStreak,
      weekendShare,
      languages,
      months,
      busiestMonth,
    }),
  };
}
