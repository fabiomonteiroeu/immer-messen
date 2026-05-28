import { expect, test } from "@playwright/test";

test.describe("smoke - critical navigation", () => {
  test("home loads with hero title", async ({ page }) => {
    await page.goto("/pt-BR");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".hero")).toBeVisible();
  });

  test("cases section renders cards on home", async ({ page }) => {
    await page.goto("/pt-BR#cases");
    await expect(page.locator(".case-card").first()).toBeVisible();
  });

  test("case detail opens with project title", async ({ page }) => {
    await page.goto("/pt-BR#cases");
    const firstCase = page.locator(".case-card").first();
    await firstCase.click();
    await page.waitForURL(/\/pt-BR\/cases\/[\w-]+/);
    await expect(page.locator(".case-project__title")).toBeVisible();
  });

  test("contact form is reachable on home", async ({ page }) => {
    await page.goto("/pt-BR");
    await expect(page.locator(".contact-card")).toBeVisible();
    await expect(page.getByLabel(/nome/i)).toBeVisible();
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
  });
});
