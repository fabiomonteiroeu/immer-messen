import { expect, test } from "@playwright/test";

/**
 * T2 da 10-UI-SPEC: prova de que o disclosure do bloco `case.panel-section` e operavel por
 * teclado e de que o conteudo recolhido nao esta na ordem de foco.
 *
 * O slug e o mesmo da suite axe e vem do fallback de mock (`apps/web/lib/cms/mock-cases.ts`),
 * onde o painel "Resultados" grava `defaultOpen: false` e carrega um `<a href="https://...">`
 * no corpo — exatamente o caso que o `inert` precisa cobrir.
 *
 * O corpo NUNCA sai do DOM: o colapso e visual (`grid-template-rows: 0fr -> 1fr`, plano 10-05)
 * para que o texto continue indexavel. E por isso que tirar o corpo da ordem de foco depende
 * do `inert`, e nao de renderizacao condicional.
 */

const CASE_ROUTE = "/pt-BR/cases/monitoramento-cabos-submarinos";
const BODY_TEXT = /precisao inferior a 5 metros/i;

test.describe("case.panel-section - disclosure acessivel", () => {
  test("abre e fecha por teclado, e o corpo recolhido nao e focavel", async ({ page }) => {
    await page.goto(CASE_ROUTE);

    // O nome acessivel vem do titulo digitado pelo editor, nao de um rotulo ARIA generico.
    // Ancorar por role/name faz este teste tambem provar esse contrato.
    const trigger = page.getByRole("button", { name: /Resultados/i });
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveClass(/case-panel__trigger/);

    const bodyInner = page.locator(".case-panel__body-inner");
    const bodyLink = bodyInner.locator("a").first();

    // 1. estado inicial: recolhido, porque o editor gravou defaultOpen: false
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(bodyInner).toHaveAttribute("inert", "");

    // 2. SEO: o corpo esta no DOM mesmo recolhido
    await expect(bodyInner).toContainText(BODY_TEXT);

    // 3. o link dentro do corpo recolhido nao entra na ordem de foco
    await trigger.focus();
    await page.keyboard.press("Tab");
    const focusIsInsidePanelBody = await page.evaluate(() => {
      const active = document.activeElement;
      const inner = document.querySelector(".case-panel__body-inner");
      return Boolean(active && inner && inner.contains(active));
    });
    expect(focusIsInsidePanelBody).toBe(false);
    await expect(bodyLink).not.toBeFocused();

    // 4. Enter expande
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(bodyInner).not.toHaveAttribute("inert", /.*/);
    await expect(bodyInner).toContainText(BODY_TEXT);

    // com o painel aberto o link volta a ser alcancavel por teclado
    await trigger.focus();
    await page.keyboard.press("Tab");
    await expect(bodyLink).toBeFocused();

    // 5. Space recolhe
    await trigger.focus();
    await page.keyboard.press(" ");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(bodyInner).toHaveAttribute("inert", "");
    await expect(bodyInner).toContainText(BODY_TEXT);
  });
});
