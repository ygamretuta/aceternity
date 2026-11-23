import { expect, test } from "@playwright/test";

test("visitor sees the home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Your year in/ })).toBeVisible();
});
