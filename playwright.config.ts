import { defineConfig } from "@playwright/test";

// CI points PLAYWRIGHT_BASE_URL at a Vercel preview URL; locally we start the dev server.
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  use: { baseURL },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : { command: "pnpm dev", url: baseURL, reuseExistingServer: true },
});
