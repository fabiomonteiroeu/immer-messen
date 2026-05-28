"use client";

import { useRef, useState, useEffect } from "react";
import type { CmsNewsArticle } from "@/lib/cms/schemas";
import { resolveMediaUrl } from "@/lib/cms/media";

type NewsBlockProps = {
  heading?: string;
  placeholderText?: string;
  articles?: CmsNewsArticle[];
};

export function NewsBlock({ heading, placeholderText, articles = [] }: NewsBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);

  const checkScrollLimits = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollPrev(scrollLeft > 5);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 5);

    // Calculate active dot based on card width
    const card = containerRef.current.querySelector(".news-card");
    if (card) {
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 20; // 1.25rem = 20px
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveDot(index);
    }
  };

  useEffect(() => {
    checkScrollLimits();

    // Listen to window resize to recalculate dots count
    const handleResize = () => {
      checkScrollLimits();
      calculateDots();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [articles]);

  const calculateDots = () => {
    if (!containerRef.current || articles.length === 0) return;
    const { scrollWidth, clientWidth } = containerRef.current;
    const card = containerRef.current.querySelector(".news-card");
    if (card) {
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 20; // 1.25rem = 20px
      const itemsPerPage = Math.round(clientWidth / (cardWidth + gap));
      const pages = Math.max(1, articles.length - itemsPerPage + 1);
      setDotsCount(pages);
    }
  };

  useEffect(() => {
    calculateDots();
  }, [articles]);

  const scroll = (direction: "prev" | "next") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const card = container.querySelector(".news-card") as HTMLElement;
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width;
    const gap = 20; // 1.25rem = 20px
    const scrollAmount = direction === "next" ? cardWidth + gap : -(cardWidth + gap);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToPage = (pageIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const card = container.querySelector(".news-card") as HTMLElement;
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width;
    const gap = 20; // 1.25rem = 20px
    container.scrollTo({ left: pageIndex * (cardWidth + gap), behavior: "smooth" });
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section aria-label={heading ?? "Noticias"} className="news-block" id="noticias">
      <div className="container">
        {heading ? <h2 className="news-block__title">{heading}</h2> : null}

        {articles.length > 0 ? (
          <div className="carousel">
            {canScrollPrev && (
              <button
                aria-label="Anterior"
                className="carousel__arrow carousel__arrow--prev"
                onClick={() => scroll("prev")}
              >
                <svg fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <div
              className="carousel__track-wrap"
              ref={containerRef}
              onScroll={checkScrollLimits}
              style={{ overflowX: "auto", scrollbarWidth: "none" }}
            >
              <div className="carousel__track">
                {articles.map((article) => {
                  const mediaUrl = resolveMediaUrl(article.coverImage?.url);
                  const isLink = article.authorSource && article.authorSource.startsWith("http");

                  const CardWrapper = isLink ? "a" : "div";
                  const wrapperProps = isLink
                    ? { href: article.authorSource!, target: "_blank", rel: "noopener noreferrer", className: "news-card" }
                    : { className: "news-card" };

                  return (
                    <CardWrapper key={article.id} {...(wrapperProps as any)}>
                      <div className="news-card__head">
                        <div className="news-card__avatar" />
                        <div className="news-card__who">
                          <b>Immer Messen</b>
                          <span>{formatDate(article.publishedDate)}</span>
                        </div>
                        <div className="news-card__in">in</div>
                      </div>
                      <div className="news-card__body">
                        <p>{article.summary}</p>
                      </div>
                      {mediaUrl ? (
                        <div className="news-card__media">
                          <img
                            alt={article.title}
                            loading="lazy"
                            src={mediaUrl}
                          />
                        </div>
                      ) : null}
                    </CardWrapper>
                  );
                })}
              </div>
            </div>

            {canScrollNext && (
              <button
                aria-label="Próximo"
                className="carousel__arrow carousel__arrow--next"
                onClick={() => scroll("next")}
              >
                <svg fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {dotsCount > 1 && (
              <div className="carousel__dots">
                {Array.from({ length: dotsCount }).map((_, i) => (
                  <button
                    aria-current={i === activeDot ? "page" : undefined}
                    className="carousel__dot"
                    key={i}
                    onClick={() => scrollToPage(i)}
                    style={{ border: 0, padding: 0, cursor: "pointer" }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="news-block__placeholder" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
            <h3 style={{ fontSize: "1.25rem", color: "var(--c-gray-600)", fontWeight: 500 }}>
              {placeholderText ?? "Em breve, novas publicações."}
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
