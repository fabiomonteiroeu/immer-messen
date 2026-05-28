import { describe, expect, it } from "vitest";

import { articleJsonLd, jsonLdScript, organizationJsonLd } from "@/lib/seo/jsonld";

describe("organizationJsonLd", () => {
  it("emits Organization with required fields", () => {
    const org = organizationJsonLd();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Immer Messen");
    expect(org.url).toMatch(/^https?:\/\//);
    expect(org.logo).toContain("/assets/img/logo-immer.png");
  });
});

describe("articleJsonLd", () => {
  it("includes datePublished when provided", () => {
    const article = articleJsonLd({
      headline: "x",
      url: "https://example.com/x",
      datePublished: "2026-01-01",
    });
    expect(article).toMatchObject({
      "@type": "Article",
      headline: "x",
      datePublished: "2026-01-01",
    });
  });

  it("omits optional fields when absent", () => {
    const article = articleJsonLd({ headline: "y", url: "https://example.com/y" });
    expect("datePublished" in article).toBe(false);
    expect("image" in article).toBe(false);
  });
});

describe("jsonLdScript", () => {
  it("escapes </script> by escaping <", () => {
    const out = jsonLdScript({ tag: "</script>" });
    expect(out).not.toContain("</script>");
    expect(out).toContain("\\u003c");
  });
});
