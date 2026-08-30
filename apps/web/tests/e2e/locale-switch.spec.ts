import { expect, test } from "@playwright/test";

// Usa `tecnologia` -> `technology` porque e o unico pageKey cujo slug realmente muda
// entre locales (ver `slugByLocaleAndPageKey` em lib/cms/page-routes.ts). Trocar por uma
// rota de slug identico faria o teste passar sem provar a traducao.
// Antes usava `quem-somos` -> `about`, mas o commit deebde2 removeu essa pagina de proposito
// e atualizou o teste unitario de page-routes sem atualizar este e2e.
test("locale switcher translates the slug across locales", async ({ page }) => {
  await page.goto("/pt-BR/tecnologia");
  await expect(page).toHaveURL(/\/pt-BR\/tecnologia$/);

  await page.getByRole("button", { name: /selecionar idioma/i }).click();
  await page.getByRole("menuitem", { name: /EN/i }).click();
  await page.waitForURL(/\/en\/technology$/);
  await expect(page).toHaveURL(/\/en\/technology$/);
});
