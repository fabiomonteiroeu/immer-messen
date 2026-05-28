import { createHmac } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  process.env.REVALIDATE_SECRET = "test-revalidate-secret-12345";
  process.env.PREVIEW_SECRET = "test-preview-secret-12345";
});

async function loadRevalidation() {
  return import("@/lib/cms/revalidation");
}

describe("verifyHmac", () => {
  it("accepts a valid sha256 signature", async () => {
    const { verifyHmac } = await loadRevalidation();
    const body = '{"model":"case","entry":{"slug":"x","locale":"pt-BR"}}';
    const sig = createHmac("sha256", "test-revalidate-secret-12345").update(body).digest("hex");
    expect(verifyHmac(body, `sha256=${sig}`)).toBe(true);
    expect(verifyHmac(body, sig)).toBe(true);
  });

  it("rejects invalid or missing signature", async () => {
    const { verifyHmac } = await loadRevalidation();
    expect(verifyHmac("body", null)).toBe(false);
    expect(verifyHmac("body", "deadbeef")).toBe(false);
  });
});

describe("mapEventToInvalidations", () => {
  it("maps page event to tags + path", async () => {
    const { mapEventToInvalidations } = await loadRevalidation();
    const result = mapEventToInvalidations({
      model: "page",
      entry: { pageKey: "technology", locale: "pt-BR" },
    });
    expect(result.tags).toContain("pages");
    expect(result.tags).toContain("page:technology:pt-BR");
    expect(result.paths).toContain("/pt-BR/tecnologia");
  });

  it("maps case event to tags + listing + detail paths", async () => {
    const { mapEventToInvalidations } = await loadRevalidation();
    const result = mapEventToInvalidations({
      model: "case",
      entry: { slug: "abc", locale: "pt-BR" },
    });
    expect(result.tags).toContain("cases");
    expect(result.tags).toContain("case:abc");
    expect(result.paths).toContain("/pt-BR");
    expect(result.paths).toContain("/pt-BR/cases/abc");
  });

  it("maps news-article event to tags + paths", async () => {
    const { mapEventToInvalidations } = await loadRevalidation();
    const result = mapEventToInvalidations({
      model: "news-article",
      entry: { locale: "pt-BR" },
    });
    expect(result.tags).toContain("news");
    expect(result.paths).toContain("/pt-BR");
  });

  it("returns skipped for unknown model", async () => {
    const { mapEventToInvalidations } = await loadRevalidation();
    expect(mapEventToInvalidations({ model: "unknown" })).toMatchObject({ skipped: true });
  });
});
