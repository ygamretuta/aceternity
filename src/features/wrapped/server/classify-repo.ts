import type { RepoKind } from "../types";

// The kind with the most matching words wins; ties go to the earlier entry. Words are matched
// whole, so "main" never counts as "ai".
const KIND_KEYWORDS: { kind: RepoKind; words: string[] }[] = [
  {
    kind: "finance",
    words: [
      "stock",
      "stocks",
      "trading",
      "finance",
      "crypto",
      "portfolio",
      "budget",
      "invoice",
      "payments",
    ],
  },
  {
    kind: "ai",
    words: [
      "ai",
      "llm",
      "gpt",
      "claude",
      "openai",
      "agent",
      "agents",
      "ml",
      "chatbot",
      "rag",
      "prompt",
    ],
  },
  {
    kind: "game",
    words: ["game", "games", "pixel", "quest", "quests", "unity", "godot", "phaser", "arcade"],
  },
  {
    kind: "mobile",
    words: ["mobile", "ios", "android", "swift", "flutter", "expo", "react-native"],
  },
  {
    kind: "data",
    words: [
      "dashboard",
      "analytics",
      "data",
      "chart",
      "charts",
      "visualization",
      "monitor",
      "monitoring",
      "tracker",
      "scraper",
      "etl",
    ],
  },
  {
    kind: "design",
    words: [
      "color",
      "colour",
      "palette",
      "design",
      "css",
      "tailwind",
      "figma",
      "theme",
      "icons",
      "typography",
    ],
  },
  { kind: "cli", words: ["cli", "terminal", "command-line", "shell", "bash", "script", "scripts"] },
  {
    kind: "web",
    words: [
      "web",
      "website",
      "nextjs",
      "next",
      "react",
      "frontend",
      "landing",
      "portfolio-site",
      "blog",
      "app",
    ],
  },
];

const DEFAULT_KIND: RepoKind = "code";

type RepoDescriptor = { name: string; description: string | null; topics: string[] };

/** Guesses what a repository is about from its name, description and topics. */
export function classifyRepo({ name, description, topics }: RepoDescriptor): RepoKind {
  const haystack = [name, description ?? "", ...topics].join(" ").toLowerCase();
  const words = new Set(
    haystack.split(/[^a-z0-9-]+/).flatMap((word) => [word, ...word.split("-")]),
  );
  let best: { kind: RepoKind; score: number } | null = null;
  for (const { kind, words: keywords } of KIND_KEYWORDS) {
    const score = keywords.filter((keyword) => words.has(keyword)).length;
    if (score > (best?.score ?? 0)) best = { kind, score };
  }
  return best?.kind ?? DEFAULT_KIND;
}
