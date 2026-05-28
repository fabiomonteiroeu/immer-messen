"use client";

import { useEffect } from "react";

import { logger } from "@/lib/logger";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("locale.boundary", { digest: error.digest, message: error.message });
  }, [error]);

  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <span className="eyebrow">Erro</span>
        <h1 className="page-hero__title">Algo deu errado</h1>
        <p className="hero__subtitle">
          Encontramos um problema ao carregar esta pagina. Tente novamente em instantes.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <button className="btn btn-light" onClick={() => reset()} type="button">
            Tentar novamente
          </button>
        </p>
      </div>
    </section>
  );
}
