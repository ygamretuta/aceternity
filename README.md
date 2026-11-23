# aceternity

Developer Wrapped: type a GitHub username and get a scroll-driven story of their coding year, built with Aceternity UI components. Preview without a token at `/sample`.

## How it works

- `/` landing (Spotlight, Flip Words, Vanish Input) validates the username and routes to `/u/<login>`.
- `/u/<login>` loads the year inside `<Suspense>` while the Multi-step Loader plays, then renders eight sections: intro, commits, activity (Bento Grid), top repos (Card Hover Effect), languages, monthly timeline, personality (Aurora), and a share dock.
- `src/adapters/github.ts` is the only code that talks to GitHub's GraphQL API and returns the app's own types. `src/features/wrapped/server/build-wrapped.ts` turns that into the story data (streaks, weekend share, language mix, personality). Results are cached per user and year for hours.
- `/u/<login>/opengraph-image` generates the share image with `next/og`.
- Needs `GITHUB_TOKEN` (a fine-grained token with public read access). Set it in `.env.local` and in Vercel.
- Aceternity components live in `src/components/aceternity/` (added with the shadcn CLI: `pnpm dlx shadcn@latest add https://ui.aceternity.com/registry/<name>.json`).

Next.js 16 (App Router, React 19), TypeScript, Tailwind v4, Prisma + Postgres (Neon), S3, Sentry, PostHog. Deployed on Vercel.

## Setup

1. Install Node 24+ and pnpm 10+.
2. `pnpm install` (also runs `prisma generate`).
3. `cp .env.example .env.local` and fill in values. The database URLs already point at the local container.
4. `docker compose up -d` starts local Postgres.
5. `pnpm prisma migrate dev` applies migrations.
6. `pnpm dev` and open http://localhost:3000.

Checks: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build`.

## Folder map

| Path                     | Purpose                                                                        |
| ------------------------ | ------------------------------------------------------------------------------ |
| `src/app/`               | Routes only. Thin pages that compose features.                                 |
| `src/features/<area>/`   | One folder per business area: `components/`, `hooks/`, `server/`, `types.ts`.  |
| `src/components/ui/`     | Shared presentational components.                                              |
| `src/adapters/`          | The only place vendor SDKs are imported (Sentry, PostHog, S3, client systems). |
| `src/db/client.ts`       | The single Prisma client.                                                      |
| `src/lib/`               | Small shared helpers and constants.                                            |
| `src/styles/globals.css` | Tailwind import and `@theme` tokens.                                           |
| `prisma/schema.prisma`   | The data contract. Every change is a migration in a PR.                        |
| `tests/e2e/`             | Playwright tests. Set `PLAYWRIGHT_BASE_URL` to run against a Vercel preview.   |
| `terraform/`             | Vercel project, env vars, domain, S3 bucket.                                   |

## Adding a feature

1. Model data in `prisma/schema.prisma`, then `pnpm prisma migrate dev --name <name>`.
2. Create `src/features/<area>/` with `server/` (queries, Server Actions), `components/`, `hooks/`, `types.ts`.
3. Validate input with Zod at every boundary and infer types with `z.infer`.
4. Add a thin page in `src/app/` that reads params, calls the feature and renders.
5. New external system: add `src/adapters/<system>.ts` and import the vendor SDK only there.
6. Add Vitest tests next to the code and a Playwright test for the critical flow.

## Monitoring (Sentry)

- Create a Sentry project for Next.js. Set `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_AUTH_TOKEN` (source maps) in Vercel (Terraform sets them).
- Sentry is enabled only in production builds. Traces sample at 0.1. Events are scrubbed in `src/lib/monitoring-config.ts`.
- Report handled errors with `captureError(error, { area, action })` from `src/adapters/monitoring.ts`.
- Test error: on a deployed build, throw an error in a page temporarily, or call `captureError(new Error("test"))` from a client component, and check the Sentry issue list.

## Analytics (PostHog)

- Create a PostHog project. Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.
- Disabled in development. Pageviews are automatic; custom events come only from `ANALYTICS_EVENTS` in `src/adapters/analytics-events.ts`. Current events: `signed_up`.
- Identify users by internal id only, never emails or names.
- Verify: in a production build call `trackEvent(ANALYTICS_EVENTS.SIGNED_UP)` and check PostHog's Activity (live events) view.
- Feature flags only through `isFeatureEnabled(flag)`.
