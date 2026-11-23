import * as Sentry from "@sentry/nextjs";
import { buildSentryOptions } from "@/lib/monitoring-config";

Sentry.init(buildSentryOptions(process.env.NEXT_PUBLIC_SENTRY_DSN));

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
