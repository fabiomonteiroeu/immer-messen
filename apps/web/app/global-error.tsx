"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Servico indisponivel</h1>
        <p style={{ marginBottom: "1.5rem", opacity: 0.8 }}>
          Estamos encontrando um problema temporario. Por favor, tente novamente.
        </p>
        {error.digest ? (
          <p style={{ fontSize: ".85rem", opacity: 0.55, marginBottom: "1.5rem" }}>
            ref: {error.digest}
          </p>
        ) : null}
        <button
          onClick={() => reset()}
          style={{
            background: "#1b2a5e",
            color: "#fff",
            border: "none",
            padding: ".75rem 1.5rem",
            borderRadius: "999px",
            fontWeight: 600,
            cursor: "pointer",
          }}
          type="button"
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
