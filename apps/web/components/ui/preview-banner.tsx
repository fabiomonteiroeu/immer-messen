import { draftMode } from "next/headers";

export async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <div className="preview-banner" role="status" aria-live="polite">
      <span className="preview-banner__dot" aria-hidden="true" />
      <span>Preview ativo - voce esta vendo conteudo nao publicado.</span>
      <a className="preview-banner__exit" href="/api/preview/exit">
        Sair do preview
      </a>
    </div>
  );
}
