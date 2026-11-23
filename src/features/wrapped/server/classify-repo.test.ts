import { describe, expect, it } from "vitest";
import { classifyRepo } from "./classify-repo";

const repo = (name: string, description: string | null = null, topics: string[] = []) => ({
  name,
  description,
  topics,
});

describe("classifyRepo", () => {
  it("recognises a stock dashboard as finance, not generic data", () => {
    expect(classifyRepo(repo("stocktracker", "Local stock exchange dashboard"))).toBe("finance");
  });

  it("recognises a live monitoring dashboard as data", () => {
    expect(classifyRepo(repo("ww3-watch", "Live dashboard of conflict signals"))).toBe("data");
  });

  it("prefers the kind with the most matching words", () => {
    expect(classifyRepo(repo("colorwheel", "Mobile-first color palette builder for design"))).toBe(
      "design",
    );
  });

  it("uses topics", () => {
    expect(classifyRepo(repo("thing", null, ["react-native"]))).toBe("mobile");
  });

  it("matches whole words only", () => {
    expect(classifyRepo(repo("maintain", "Mainly remains"))).toBe("code");
  });
});
