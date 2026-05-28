import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <span className="eyebrow">404</span>
        <h1 className="page-hero__title">Pagina nao encontrada</h1>
        <p className="hero__subtitle">A rota solicitada nao existe ou foi movida.</p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link className="btn btn-light" href="/pt-BR">
            Voltar para o inicio
          </Link>
        </p>
      </div>
    </section>
  );
}
