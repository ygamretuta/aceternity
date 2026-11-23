"use client";

import posthog from "posthog-js";
import { isProduction } from "@/lib/env";
import type { AnalyticsEvent } from "./analytics-events";

type EventProperties = Record<string, string | number | boolean | null>;

let isReady = false;

/** Starts PostHog once in the browser. Does nothing in development or without a key. */
export function initAnalytics(): void {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (isReady || !isProduction || !key) return;
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: "history_change",
    person_profiles: "identified_only",
  });
  isReady = true;
}

export function trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
  if (isReady) posthog.capture(event, properties);
}

/** Identify by internal id only; never pass emails, names or tokens. */
export function identifyUser(userId: string): void {
  if (isReady) posthog.identify(userId);
}

export function resetUser(): void {
  if (isReady) posthog.reset();
}

export function isFeatureEnabled(flag: string): boolean {
  return isReady && posthog.isFeatureEnabled(flag) === true;
}
