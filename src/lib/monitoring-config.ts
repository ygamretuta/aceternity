import type { ErrorEvent } from "@sentry/nextjs";
import { isProduction } from "@/lib/env";

const TRACES_SAMPLE_RATE = 0.1;
const REDACTED = "[redacted]";
const SENSITIVE_HEADERS = ["authorization", "cookie", "set-cookie"];

/** Removes personal data and credentials before an event leaves the app. */
export function scrubEvent(event: ErrorEvent): ErrorEvent {
  if (event.user) event.user = { id: event.user.id };
  const headers = event.request?.headers;
  if (headers) {
    for (const name of Object.keys(headers)) {
      if (SENSITIVE_HEADERS.includes(name.toLowerCase())) headers[name] = REDACTED;
    }
  }
  if (event.request) delete event.request.cookies;
  return event;
}

/** Shared Sentry options for the browser, server and edge runtimes. */
export function buildSentryOptions(dsn: string | undefined) {
  return {
    dsn,
    enabled: isProduction && Boolean(dsn),
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    tracesSampleRate: TRACES_SAMPLE_RATE,
    sendDefaultPii: false,
    beforeSend: scrubEvent,
  };
}
