import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="pt-BR">
      <body
        style={{
          fontFamily:
            'var(--font-poppins, "Poppins"), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: "4rem 1.5rem",
          textAlign: "center",
          color: "#1a1f2c",
        }}
      >
        <p style={{ opacity: 0.55, letterSpacing: ".15em", fontSize: ".85rem" }}>404</p>
        <h1 style={{ fontSize: "2rem", margin: "1rem 0" }}>Pagina nao encontrada</h1>
        <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>
          A rota solicitada nao existe ou foi movida.
        </p>
        <Link
          href="/pt-BR"
          style={{
            background: "#1b2a5e",
            color: "#fff",
            padding: ".75rem 1.5rem",
            borderRadius: "999px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Voltar para o inicio
        </Link>
      </body>
    </html>
  );
}
