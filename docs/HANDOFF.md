# Handoff log

Current state of work, shared between AI agents (Claude Code, Cursor) and humans. Newest entry first. Keep the last ~10 entries; delete older ones (git history keeps them).

Each entry: **date, who** — what was done, what is next, open decisions. Facts that git or the PR already shows don't belong here; record the things they don't (why an option was rejected, half-finished work, known gaps).

## 2026-11-23, Claude Code (livelier repo cards)

- Repo cards are now 3D tilt cards with a glowing border (Aceternity 3D Card + Glowing Effect). Each shows an animated graphic by repo kind, a language strip, a commit-share ring, stars, and an Open link on hover.
- Kind comes from `classifyRepo` (name, description, GitHub topics; most matching whole words wins). Add kinds in `classify-repo.ts`, `repo-kinds.ts` and `repo-graphics.tsx`.
- Verified live on `/u/ygamretuta`. Removed the unused Card Hover Effect component.

## 2026-11-23, Claude Code (Developer Wrapped)

- Built the Wrapped idea: landing, `/u/[username]` story (8 sections), `/sample` fixture page, OG image, share dock. Aceternity components vendored in `src/components/aceternity/` (lint/format excluded).
- Verified: lint, typecheck, Vitest (13), Playwright (3, against `/` and `/sample`), build, visual pass over `/sample` in the browser.
- NOT verified: the live `/u/<login>` path and OG image, because `GITHUB_TOKEN` is empty. Add one to `.env.local` and open `/u/<some-user>`; the first run may reveal GraphQL query mistakes.
- Decisions: the idea proposed a `useWrappedData` hook and `@vercel/og`; we use a Server Component + cached `getWrapped` (per the project's rules) and the built-in `next/og`. Personality is derived from calendar data (no commit hours via GraphQL), so no "Midnight Refactorer". Skipped globe and collaborators (not available from one GraphQL query); no Tracing Beam or Apple Carousel yet.
- Tailwind v4 needed the `spotlight` and `aurora` keyframes added to `@theme`, and `dark:` is opt-in via a `.dark` ancestor.
- Next: real token run, then consider Compare-slider, collaborators globe, Apple Cards Carousel for repos.

## 2026-11-23, Claude Code (bootstrap)

- Bootstrapped the app with Stack A (Next.js 16, Tailwind v4, Prisma 7, Sentry, PostHog, S3, Vitest, Playwright, CI, Terraform).
- Verified: lint, typecheck, Vitest, `prisma validate`, build, Playwright home test.
- Not verified: Sentry and PostHog delivery (no DSN or key yet), `ci.yml`, `terraform validate`, Neon and Vercel setup.
- Next: add the first domain models and feature; fill `.github/CODEOWNERS`; set real Terraform variables.
- Decision: Prisma pinned to 7.10.1 because the CLI otherwise resolved to an 8.0 release candidate that mismatched the client.
