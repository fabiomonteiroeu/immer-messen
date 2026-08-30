import { describe, expect, it } from "vitest";

import { getMockCases } from "@/lib/cms/mock-cases";
import { cmsCaseSchema, cmsCaseSectionSchema } from "@/lib/cms/schemas";
import type { CmsCase } from "@/lib/cms/schemas";

/**
 * Contrato dos blocos de case exercitado sobre o fallback local.
 *
 * O mock nao e so conteudo de demonstracao: e o que a rota renderiza quando o Strapi nao
 * responde, e e o que a suite Playwright/axe visita. Se ele divergir do contrato zod, a
 * pagina cai no caminho de erro em producao e o e2e passa a testar outra coisa.
 */

const CASE_SLUG = "monitoramento-cabos-submarinos";

const ALL_DISCRIMINANTS = [
  "case.hero-section",
  "case.info-card",
  "case.lead-section",
  "case.text-section",
  "case.section-title",
  "case.highlight-section",
  "case.figure-section",
  "case.two-column-section",
  "case.panel-section",
] as const;

const casesPt = getMockCases("pt-BR");

function findCase(slug: string): CmsCase {
  const entry = casesPt.find((item) => item.slug === slug);
  if (!entry) throw new Error(`mock sem o slug estavel "${slug}"`);
  return entry;
}

describe("contrato zod dos cases mockados", () => {
  it("tem entradas em pt-BR", () => {
    expect(casesPt.length).toBeGreaterThan(0);
  });

  it("cada entrada satisfaz cmsCaseSchema", () => {
    for (const entry of casesPt) {
      expect(() => cmsCaseSchema.parse(entry), `case ${entry.slug}`).not.toThrow();
    }
  });

  it("cada bloco satisfaz cmsCaseSectionSchema", () => {
    for (const entry of casesPt) {
      for (const section of entry.sections ?? []) {
        expect(
          () => cmsCaseSectionSchema.parse(section),
          `${entry.slug} / ${section.__component}`,
        ).not.toThrow();
      }
    }
  });
});

describe(`cobertura de blocos do case "${CASE_SLUG}"`, () => {
  const sections = findCase(CASE_SLUG).sections ?? [];

  it("cobre os 9 discriminantes da dynamic zone", () => {
    const present = new Set(sections.map((section) => section.__component));
    for (const discriminant of ALL_DISCRIMINANTS) {
      expect(present.has(discriminant), `faltou ${discriminant}`).toBe(true);
    }
  });

  it("tem uma faixa angulada de abertura e uma de fechamento (D-11)", () => {
    const variants = sections
      .filter((section) => section.__component === "case.highlight-section")
      .map((section) => section.variant ?? "opening");

    expect(variants).toContain("opening");
    expect(variants).toContain("closing");
  });

  it("tem um painel colapsavel que comeca recolhido (ancora do teste de teclado)", () => {
    const panels = sections.filter((section) => section.__component === "case.panel-section");

    expect(panels.length).toBeGreaterThan(0);
    expect(panels.some((panel) => panel.defaultOpen === false)).toBe(true);
  });
});

describe("invariantes de acessibilidade e de marcacao dos blocos", () => {
  /**
   * Invariante que impede a violacao `link-name` (serious/wcag2a) do axe: o logo vira um
   * `<a>` com um `<img>` dentro, e o unico nome acessivel possivel e o `alt`. O renderer
   * resolve `slot.alt ?? slot.logo.alternativeText` e descarta o logo se o resultado for
   * vazio — mas descartar conteudo do editor em silencio nao e o comportamento desejado
   * no mock, entao aqui o dado tem que estar certo na origem.
   */
  it("todo logo de parceiro resolve um alt nao vazio", () => {
    for (const entry of casesPt) {
      for (const section of entry.sections ?? []) {
        if (section.__component !== "case.info-card") continue;
        for (const slot of section.partnerLogos ?? []) {
          const alt = (slot.alt ?? slot.logo.alternativeText ?? "").trim();
          expect(alt, `${entry.slug} / logo ${slot.logo.id}`).not.toBe("");
        }
      }
    }
  });

  /** D-09: o dois-pontos e da marcacao (`<b>{label}</b>: {value}`), o editor nao o digita. */
  it("nenhum rotulo de linha do card termina em dois-pontos", () => {
    for (const entry of casesPt) {
      for (const section of entry.sections ?? []) {
        if (section.__component !== "case.info-card") continue;
        for (const row of section.rows) {
          expect(row.label.trimEnd().endsWith(":"), `${entry.slug} / "${row.label}"`).toBe(false);
        }
      }
    }
  });
});
