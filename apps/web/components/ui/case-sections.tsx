/**
 * Renderer da dynamic zone `sections` do case-study.
 *
 * Contratos que este arquivo materializa (ver 10-UI-SPEC.md e 10-CONTEXT.md):
 * - D-14: a pagina de case le **apenas** da zona. Nenhum campo legado do content type
 *   e consultado aqui.
 * - Ritmo vertical: os blocos sao irmaos diretos de `.case-blocks`, que e um contentor
 *   flex no CSS (plano 10-05). Flex nao colapsa margens de irmaos, entao o espaco proprio
 *   de cada bloco soma com o do vizinho — que e o que torna qualquer ordem legivel.
 * - D-06: o hero e um bloco como outro qualquer. Quando o primeiro bloco **nao** e o hero,
 *   o wrapper ganha `.case-blocks--header-offset` para o conteudo nao passar por baixo do
 *   header transparente.
 * - Regra global de heading: o primeiro bloco titulado da zona emite `<h1>`; todo outro
 *   bloco titulado emite `<h2>`. Nenhuma tag de heading e fixa por tipo de bloco.
 *
 * As classes emitidas aqui sao o contrato consumido pelo CSS do plano 10-05. As classes
 * globais de regua de titulo, de eyebrow em caixa, de hero de pagina e de acordeao sao
 * compartilhadas com outras paginas e **nao** podem ser reusadas nem alteradas por este
 * renderer — os blocos de case usam classes proprias, todas prefixadas por `case-`.
 */

import { CasePanel } from "@/components/ui/case-panel";
import type { CmsCaseSection } from "@/lib/cms/schemas";
import { resolveMediaUrl } from "@/lib/cms/media";

type HeadingLevel = 1 | 2;

function Html({ className, html }: { className?: string; html: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Um bloco "tem titulo" quando emite um heading visivel. E o unico insumo da regra global
 * de niveis: blocos sem titulo nunca emitem heading e nunca disputam o `<h1>`.
 *
 * O eyebrow da faixa e `<span>` e o pull-quote e `<p>` — nenhum dos dois conta como titulo.
 * A faixa na variante `closing` tambem nao conta: la o texto de destaque e um `<p>`, porque
 * nao tem funcao de sumario.
 */
function blockHasTitle(section: CmsCaseSection): boolean {
  switch (section.__component) {
    case "case.hero-section":
    case "case.section-title":
    case "case.info-card":
    case "case.lead-section":
    case "case.panel-section":
      return Boolean(section.title);
    case "case.highlight-section":
      return section.variant !== "closing" && Boolean(section.heading);
    default:
      return false;
  }
}

/** Unidade de render: um bloco solto ou um grupo de `case.info-card` adjacentes. */
type RenderUnit =
  | { kind: "single"; index: number; section: CmsCaseSection }
  | { kind: "info-group"; items: { index: number; section: CmsCaseSection }[] };

function toRenderUnits(sections: CmsCaseSection[]): RenderUnit[] {
  const units: RenderUnit[] = [];

  sections.forEach((section, index) => {
    if (section.__component === "case.info-card") {
      const last = units[units.length - 1];
      if (last && last.kind === "info-group") {
        last.items.push({ index, section });
        return;
      }
      units.push({ kind: "info-group", items: [{ index, section }] });
      return;
    }
    units.push({ index, kind: "single", section });
  });

  return units;
}

function blockKey(section: CmsCaseSection, index: number): string {
  return `${section.__component}-${section.id ?? index}`;
}

export function CaseSections({ sections }: { sections: CmsCaseSection[] }) {
  if (sections.length === 0) {
    return null;
  }

  const needsHeaderOffset = sections[0]?.__component !== "case.hero-section";
  const firstTitledIndex = sections.findIndex(blockHasTitle);
  const headingLevelFor = (index: number): HeadingLevel => (index === firstTitledIndex ? 1 : 2);
  const units = toRenderUnits(sections);

  return (
    <div className={`case-blocks${needsHeaderOffset ? " case-blocks--header-offset" : ""}`}>
      {units.map((unit) => {
        if (unit.kind === "info-group") {
          const count = unit.items.length;
          const size = count === 1 ? "1" : count === 2 ? "2" : "many";
          return (
            <div
              className={`case-info-row case-info-row--${size}`}
              key={`case-info-row-${unit.items[0].index}`}
            >
              {unit.items.map((item) => (
                <CaseBlock
                  headingLevel={headingLevelFor(item.index)}
                  key={blockKey(item.section, item.index)}
                  section={item.section}
                />
              ))}
            </div>
          );
        }

        return (
          <CaseBlock
            headingLevel={headingLevelFor(unit.index)}
            key={blockKey(unit.section, unit.index)}
            section={unit.section}
          />
        );
      })}
    </div>
  );
}

function CaseBlock({
  section,
  headingLevel,
}: {
  section: CmsCaseSection;
  headingLevel: HeadingLevel;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  switch (section.__component) {
    case "case.text-section":
      return <Html className="case-text" html={section.body} />;

    case "case.section-title":
      return (
        <Heading className="case-section-title">
          <span aria-hidden="true" className="case-section-title__rule" />
          <span className="case-section-title__text">{section.title}</span>
          <span aria-hidden="true" className="case-section-title__rule" />
        </Heading>
      );

    case "case.highlight-section": {
      const variant = section.variant ?? "opening";
      return (
        <section className={`case-band case-band--${variant}`}>
          <div className="case-band__grid">
            <div>
              {variant === "opening" && section.eyebrow ? (
                <span className="case-band__eyebrow">{section.eyebrow}</span>
              ) : null}
              {section.heading ? (
                variant === "closing" ? (
                  <p className="case-band__statement">{section.heading}</p>
                ) : (
                  <Heading className="case-band__heading">{section.heading}</Heading>
                )
              ) : null}
            </div>
            <Html className="case-band__body" html={section.body} />
          </div>
        </section>
      );
    }

    case "case.figure-section": {
      const src = resolveMediaUrl(section.image?.url);
      if (!src) return null;
      return (
        <figure className="case-figure">
          <img alt={section.image?.alternativeText ?? ""} loading="lazy" src={src} />
          {section.caption ? (
            <figcaption className="case-figure__caption">{section.caption}</figcaption>
          ) : null}
        </figure>
      );
    }

    case "case.two-column-section": {
      // O pull-quote fica entre o primeiro e o segundo paragrafo da coluna direita.
      // Sem `</p>` para dividir (corpo vazio ou richtext sem paragrafo), ele vai antes do corpo.
      const right = section.rightBody ?? "";
      const closeAt = right.toLowerCase().indexOf("</p>");
      const canSplit = closeAt !== -1;
      const rightHead = canSplit ? right.slice(0, closeAt + 4) : "";
      const rightTail = canSplit ? right.slice(closeAt + 4) : right;

      return (
        <div className="case-two-col">
          <Html className="case-text" html={section.leftBody} />
          <div className="case-two-col__right">
            {rightHead ? <Html className="case-text" html={rightHead} /> : null}
            {section.pullQuote ? <p className="case-pullquote">{section.pullQuote}</p> : null}
            {rightTail ? <Html className="case-text" html={rightTail} /> : null}
          </div>
        </div>
      );
    }

    case "case.panel-section":
      return (
        <CasePanel
          bodyHtml={section.body}
          defaultOpen={section.defaultOpen ?? true}
          headingLevel={headingLevel}
          iconName={section.icon}
          title={section.title}
        />
      );

    default:
      return null;
  }
}
