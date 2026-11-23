<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules (aceternity)

Shared by every AI agent (Claude Code, Cursor). Keep this file the single source of truth; do not duplicate it elsewhere.

## Stack

Next.js 16 App Router, React 19, TypeScript `strict`, Tailwind v4, Prisma + Postgres (Neon), Zod, S3 presigned uploads, Sentry, PostHog, Vitest, Playwright, pnpm.

## Layout

- `src/app/`: routes only. Thin pages: read params, call the feature, render.
- `src/features/<area>/{components,hooks,server,types.ts}`: one folder per business area. Data access and Server Actions live in `server/`.
- `src/components/ui/`: our own shared presentational components. `src/components/aceternity/`: vendored Aceternity UI components (installed with the shadcn CLI, excluded from lint and formatting; wrap them rather than editing).
- `src/adapters/`: the only place vendor SDKs (Sentry, PostHog, AWS, client systems) are imported.
- `src/db/client.ts`: the single Prisma client. `src/lib/`: small shared helpers.

## Rules

- `prisma/schema.prisma` is the contract. Every change is a migration. Use Prisma's generated types and enums; never hand-write a duplicate type.
- Validate untrusted input with Zod at every boundary; infer types with `z.infer`.
- Server Components fetch. Add `"use client"` only to leaves needing state, effects or browser APIs. Hooks hold client logic, not data fetching.
- One responsibility per component; split past ~100-150 lines or when data access mixes with markup.
- Early returns, named constants, options objects, lookup maps instead of long if/else chains. Comments explain why.
- Tailwind: use semantic tokens from `@theme` in `src/styles/globals.css`; no arbitrary values without a why-comment. A utility string repeated ~3 times becomes a component with variants.
- Errors: report handled errors with `captureError(error, { area, action })`; never swallow them or leave only `console.error`. No PII in events.
- Analytics: event names only from `ANALYTICS_EVENTS`; identify users by internal id only; flags only via `isFeatureEnabled`.
- DRY only after about the third repetition. No dead code, unused dependencies or stray `console.log`.
- Test names describe behavior in business terms. Colocate unit tests; Playwright for critical flows and async Server Components.

## Before finishing any change

Run `pnpm lint`, `pnpm typecheck`, `pnpm test`; run `pnpm build` for anything touching config, routes or the schema.

## Working with multiple agents

- Do not hand-edit `src/generated/`, `pnpm-lock.yaml` or `.next/`.
- One migration per schema change; name it for what it does.
- Don't reformat or touch files outside your task.
- Don't add vendor SDK imports outside `src/adapters/`.
- Never commit `.env.local` or real secrets; update `.env.example` when adding a variable.
- Scoped rules live in `.cursor/rules/`; general rules belong here.
- Read `docs/HANDOFF.md` at the start of a task. At the end, add a short entry (newest first) with what was done, what is next and open decisions; trim to the last ~10 entries.
