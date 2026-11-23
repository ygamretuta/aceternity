import { expect, test } from "@playwright/test";

test("visitor sees an error for an invalid username", async ({ page }) => {
  await page.goto("/");
  // Wait for hydration so the typed value reaches React state.
  await page.waitForLoadState("networkidle");
  await page.getByRole("textbox").pressSequentially("not a valid name!");
  await page.getByRole("textbox").press("Enter");
  await expect(page.getByText("Enter a valid GitHub username")).toBeVisible();
});

test("visitor scrolls through the sample story to the personality finale", async ({ page }) => {
  await page.goto("/sample");
  await expect(page.getByRole("heading", { name: /Your 2026/ })).toBeVisible();
  await page.getByRole("heading", { name: "The Polyglot" }).scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "The Polyglot" })).toBeVisible();
});
