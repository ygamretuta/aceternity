import { PostHog } from "posthog-node";
import { isProduction } from "@/lib/env";
import type { AnalyticsEvent } from "./analytics-events";

let client: PostHog | undefined;

function getClient(): PostHog | undefined {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!isProduction || !key) return undefined;
  client ??= new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return client;
}

/** Server-side event for the user with this internal id. */
export async function trackServerEvent(
  userId: string,
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean | null>,
): Promise<void> {
  await getClient()?.captureImmediate({ distinctId: userId, event, properties });
}

export async function isFeatureEnabledForUser(flag: string, userId: string): Promise<boolean> {
  const enabled = await getClient()?.isFeatureEnabled(flag, userId);
  return enabled === true;
}
