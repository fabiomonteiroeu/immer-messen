"use client";

/**
 * Painel colapsavel do bloco `case.panel-section` (D-10).
 *
 * Reusa o *padrao* acessivel de `apps/web/components/primitives/accordion.tsx`
 * (useId, aria-expanded/aria-controls, role="region" + aria-labelledby, chevron,
 * mecanica de grid-template-rows), mas com classes proprias escopadas ao case.
 * O `ApprovedAccordion` compartilhado nao muda: o painel reusa o padrao, nao a instancia.
 *
 * Contrato de acessibilidade:
 * - O nome acessivel do botao e o titulo digitado pelo editor. Nao adicionar atributo
 *   de rotulo ARIA no botao — ele sobrescreveria o titulo e quebraria os 3 locales.
 * - O corpo permanece no DOM mesmo recolhido (SEO). O colapso e visual, feito no CSS
 *   com `grid-template-rows: 0fr -> 1fr` (plano 10-05); nada de renderizacao condicional
 *   e nada de esconder o corpo pela propriedade de exibicao.
 * - `inert={!open}` tira o corpo recolhido da ordem de foco e da arvore de acessibilidade,
 *   para que links dentro do richtext nao fiquem alcancaveis por teclado fora da tela.
 *   React resolvido no pnpm-lock e 19.2.6, onde `inert` e prop booleana nativa.
 * - Teclado: nada alem do `<button>` nativo. `Enter` e `Space` ja alternam o estado.
 *   Sem roving tabindex — e um disclosure isolado, nao um grupo.
 *
 * O chevron e o unico SVG desta fase com tracado, e isso nao contradiz D-12a: ele e
 * affordance de estado, nao um icone do set curado de `case-icons.tsx`.
 */

import { useId, useState } from "react";

import { CaseIcon, type CaseIconKey } from "@/components/ui/case-icons";

/**
 * Sub-bloco do corpo do painel (`case.panel-block`). Existe para intercalar figuras
 * com o texto: o `body` do painel sozinho e richtext e nao carrega midia do Strapi.
 */
export type CasePanelBlock = {
  id?: number;
  heading?: string | null;
  bodyHtml?: string | null;
  imageSrc?: string | null;
  alt?: string | null;
  caption?: string | null;
};

type CasePanelProps = {
  title: string;
  bodyHtml: string;
  blocks?: CasePanelBlock[];
  iconName?: CaseIconKey | string | null;
  /** Estado inicial vindo do campo `defaultOpen` do editor (D-10). Renderizado no servidor. */
  defaultOpen?: boolean;
  /** Definido pela regra global de heading do renderer: 1 no primeiro bloco titulado, 2 nos demais. */
  headingLevel: 1 | 2;
};

export function CasePanel({
  title,
  bodyHtml,
  blocks,
  iconName,
  defaultOpen,
  headingLevel,
}: CasePanelProps) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <section className={`case-panel${open ? " is-open" : ""}`}>
      <Heading className="case-panel__heading">
        <button
          aria-controls={panelId}
          aria-expanded={open}
          className="case-panel__trigger"
          id={buttonId}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <CaseIcon className="case-panel__icon" name={iconName} />
          <span className="case-panel__title">{title}</span>
          <svg
            aria-hidden="true"
            className="case-panel__chev"
            fill="none"
            focusable="false"
            height={28}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            viewBox="0 0 24 24"
            width={28}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </Heading>
      <div
        aria-labelledby={buttonId}
        className="case-panel__body"
        id={panelId}
        role="region"
      >
        <div className="case-panel__body-inner" inert={!open}>
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          {(blocks ?? []).map((block, position) => (
            <CasePanelSubBlock
              block={block}
              key={block.id ?? position}
              /* Um nivel abaixo do titulo do painel, para nao pular degrau na arvore. */
              headingLevel={headingLevel === 1 ? 2 : 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Um sub-bloco do painel. Todos os campos sao opcionais no content type, entao cada
 * parte so entra se estiver preenchida — um bloco pode ser so texto, so figura, ou os dois.
 *
 * A figura segue o mesmo contrato de `case.figure-section`: sem `src` nao renderiza, e o
 * `alt` do bloco vence o `alternativeText` da midia (que e global, nao acompanha o locale).
 */
function CasePanelSubBlock({
  block,
  headingLevel,
}: {
  block: CasePanelBlock;
  headingLevel: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const src = (block.imageSrc ?? "").trim();
  const alt = (block.alt ?? "").trim();

  return (
    <div className="case-panel__block">
      {block.heading ? (
        <Heading className="case-panel__block-title">{block.heading}</Heading>
      ) : null}
      {block.bodyHtml ? (
        <div dangerouslySetInnerHTML={{ __html: block.bodyHtml }} />
      ) : null}
      {src ? (
        <figure className="case-panel__figure">
          <img alt={alt} loading="lazy" src={src} />
          {block.caption ? (
            <figcaption className="case-panel__figure-caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      ) : null}
    </div>
  );
}
