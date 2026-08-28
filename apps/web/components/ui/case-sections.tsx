import type { CmsCaseSection } from "@/lib/cms/schemas";
import { resolveMediaUrl } from "@/lib/cms/media";

function Html({ className, html }: { className?: string; html: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function CaseSections({ sections }: { sections: CmsCaseSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const key = `${section.__component}-${section.id ?? index}`;

        switch (section.__component) {
          case "case.text-section":
            return (
              <div className="container case-content" key={key}>
                <Html className="case-text" html={section.body} />
              </div>
            );

          case "case.section-title":
            return (
              <div className="container" key={key}>
                <h2 className="rule-heading case-section-title">{section.title}</h2>
              </div>
            );

          case "case.highlight-section":
            return (
              <section className="case-highlight" key={key}>
                <div className="container">
                  <div className="case-highlight__grid">
                    <div>
                      {section.eyebrow ? (
                        <span className="boxed-eyebrow">{section.eyebrow}</span>
                      ) : null}
                      {section.heading ? (
                        <h3 className="case-highlight__heading">{section.heading}</h3>
                      ) : null}
                    </div>
                    <Html className="case-highlight__body" html={section.body} />
                  </div>
                </div>
              </section>
            );

          case "case.figure-section": {
            const src = resolveMediaUrl(section.image?.url);
            if (!src) return null;
            return (
              <figure className="container case-figure" key={key}>
                <img alt={section.image?.alternativeText ?? ""} loading="lazy" src={src} />
                {section.caption ? (
                  <figcaption className="case-figure__caption">{section.caption}</figcaption>
                ) : null}
              </figure>
            );
          }

          case "case.two-column-section":
            return (
              <div className="container case-two-col" key={key}>
                <Html className="case-text" html={section.leftBody} />
                <div className="case-two-col__right">
                  {section.pullQuote ? (
                    <p className="case-pullquote">{section.pullQuote}</p>
                  ) : null}
                  {section.rightBody ? (
                    <Html className="case-text" html={section.rightBody} />
                  ) : null}
                </div>
              </div>
            );

          case "case.panel-section":
            return (
              <div className="container" key={key}>
                <section className="case-panel">
                  <h3 className="case-panel__title">{section.title}</h3>
                  <Html className="case-panel__body" html={section.body} />
                </section>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
