import { expect, test } from "@playwright/test";

test("locale switcher translates the slug across locales", async ({ page }) => {
  await page.goto("/pt-BR/quem-somos");
  await expect(page).toHaveURL(/\/pt-BR\/quem-somos$/);

  await page.getByRole("button", { name: /selecionar idioma/i }).click();
  await page.getByRole("menuitem", { name: /EN/i }).click();
  await page.waitForURL(/\/en\/about$/);
  await expect(page).toHaveURL(/\/en\/about$/);
});
