import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * T1 da 10-UI-SPEC: a rota de detalhe de case entra na varredura axe. Sem ela nenhum
 * dos 9 blocos da fase 10 e auditado. O slug e estavel e vem de
 * `apps/web/lib/cms/mock-cases.ts`, entao o teste roda mesmo sem o Strapi no ar — a
 * query cai no fallback de mock.
 *
 * T3 e coberto por T1, sem spec proprio: `link-name` e uma violacao `serious`/`wcag2a`,
 * exatamente a classe que o filtro abaixo reprova. A tira de logos de parceiro envolve
 * um `<img>` com `alt` nao vazio dentro do `<a>`; se algum `alt` esvaziar, o axe reprova
 * aqui (e o teste Vitest `case-blocks.test.ts` reprova antes, sobre o mock).
 */
const CASE_ROUTE = "/pt-BR/cases/monitoramento-cabos-submarinos";

const routes = ["/pt-BR", "/pt-BR/tecnologia", "/pt-BR/quem-somos", CASE_ROUTE];

for (const route of routes) {
  test(`a11y: ${route} has no serious violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["color-contrast"])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}

/**
 * `color-contrast` esta desligado na varredura geral acima e continua desligado — mexer
 * nele mudaria o contrato dos 3 caminhos que ja existiam. Mas o plano 10-05 corrigiu uma
 * reprovacao AA real justamente nesta legenda (`--c-gray-600` sobre `--c-ice` media 4.01:1;
 * foi para `--c-gray-700`, 5.9:1). Sem uma verificacao dirigida, a regressao voltaria em
 * silencio. Este teste liga `color-contrast` **so** dentro de `.case-info__logos-caption`.
 */
test("a11y: a legenda da tira de logos do case passa em contraste AA", async ({ page }) => {
  await page.goto(CASE_ROUTE);

  const caption = page.locator(".case-info__logos-caption").first();
  await expect(caption).toBeVisible();

  const results = await new AxeBuilder({ page })
    .include(".case-info__logos-caption")
    .withRules(["color-contrast"])
    .analyze();

  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});
