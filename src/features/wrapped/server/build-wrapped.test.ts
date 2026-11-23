import { describe, expect, it } from "vitest";
import {
  buildLanguages,
  buildMonths,
  calculateWeekendShare,
  choosePersonality,
  findLongestStreak,
} from "./build-wrapped";

const day = (date: string, count: number) => ({ date, count });

describe("findLongestStreak", () => {
  it("counts the longest run of consecutive active days", () => {
    const days = [
      day("2026-01-01", 2),
      day("2026-01-02", 1),
      day("2026-01-03", 0),
      day("2026-01-04", 5),
      day("2026-01-05", 1),
      day("2026-01-06", 1),
    ];
    expect(findLongestStreak(days)).toBe(3);
  });

  it("is zero when nothing was committed", () => {
    expect(findLongestStreak([day("2026-01-01", 0)])).toBe(0);
  });
});

describe("buildMonths", () => {
  it("sums contributions per month and always returns twelve months", () => {
    const months = buildMonths([day("2026-02-03", 4), day("2026-02-10", 1), day("2026-12-31", 2)]);
    expect(months).toHaveLength(12);
    expect(months[1].contributions).toBe(5);
    expect(months[11].contributions).toBe(2);
  });
});

describe("calculateWeekendShare", () => {
  it("measures the share of contributions made on Saturday and Sunday", () => {
    // 2026-01-03 is a Saturday, 2026-01-05 is a Monday.
    expect(calculateWeekendShare([day("2026-01-03", 3), day("2026-01-05", 1)])).toBe(0.75);
  });
});

describe("buildLanguages", () => {
  it("weights languages by the commits made in each repository", () => {
    const languages = buildLanguages([
      {
        nameWithOwner: "a/a",
        url: "",
        description: null,
        stars: 0,
        commits: 90,
        primaryLanguage: "TypeScript",
        topics: [],
        languages: [{ name: "TypeScript", color: "#3178c6", size: 100 }],
      },
      {
        nameWithOwner: "a/b",
        url: "",
        description: null,
        stars: 0,
        commits: 10,
        primaryLanguage: "Go",
        topics: [],
        languages: [{ name: "Go", color: "#00add8", size: 100 }],
      },
    ]);
    expect(languages.map((language) => language.name)).toEqual(["TypeScript", "Go"]);
    expect(languages[0].share).toBeCloseTo(0.9);
  });
});

describe("choosePersonality", () => {
  const base = {
    pullRequests: 10,
    reviews: 0,
    longestStreak: 3,
    weekendShare: 0.1,
    languages: [],
    months: [{ month: 0, contributions: 10 }],
    busiestMonth: { month: 0, contributions: 1 },
  };

  it("names someone who reviews more than they author a reviewer", () => {
    expect(choosePersonality({ ...base, reviews: 40 }).title).toBe("The Code Reviewer");
  });

  it("names someone with a month-long streak a marathoner", () => {
    expect(choosePersonality({ ...base, longestStreak: 45 }).title).toBe("The Marathoner");
  });

  it("falls back to a steady shipper", () => {
    expect(choosePersonality(base).title).toBe("The Steady Shipper");
  });
});
