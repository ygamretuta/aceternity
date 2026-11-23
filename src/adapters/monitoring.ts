import * as Sentry from "@sentry/nextjs";

export type ErrorContext = Record<string, string | number | boolean | null | undefined>;

/** Reports a handled error. Always pass the area and action so it can be found. */
export function captureError(error: unknown, context: ErrorContext = {}): void {
  Sentry.captureException(error, { extra: context });
}
