import { notFound } from "next/navigation";
import { GitHubRateLimitError, GitHubUserNotFoundError } from "@/adapters/github";
import { githubLoginSchema } from "../schema";
import { getWrapped } from "../server/get-wrapped";
import { getWrappedYear } from "../server/get-wrapped-year";
import type { WrappedData } from "../types";
import { RateLimitMessage } from "./rate-limit-message";
import { WrappedStory } from "./wrapped-story";

/** Loads a user's story. Not-found users go to the 404 page; rate limits get a friendly message. */
export async function UserStory({ params }: { params: Promise<{ username: string }> }) {
  const parsed = githubLoginSchema.safeParse((await params).username);
  if (!parsed.success) notFound();

  const data = await loadWrapped(parsed.data);
  if (!data) return <RateLimitMessage />;
  return <WrappedStory data={data} />;
}

async function loadWrapped(login: string): Promise<WrappedData | null> {
  try {
    return await getWrapped(login, await getWrappedYear());
  } catch (error) {
    if (error instanceof GitHubUserNotFoundError) notFound();
    if (error instanceof GitHubRateLimitError) return null;
    throw error;
  }
}
