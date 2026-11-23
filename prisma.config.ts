import { defineConfig } from "prisma/config";

// Migrations use the direct (non-pooled) connection; the app uses DATABASE_URL.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "" },
});
