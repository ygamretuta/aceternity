import * as Sentry from "@sentry/nextjs";
import { buildSentryOptions } from "./src/lib/monitoring-config";

Sentry.init(buildSentryOptions(process.env.SENTRY_DSN));
