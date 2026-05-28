import { describe, expect, it } from "vitest";

import {
  getInstitutionalPageKeyFromSlug,
  getInstitutionalSlug,
  localizePath,
} from "@/lib/cms/page-routes";

describe("getInstitutionalSlug", () => {
  it("returns localized slug for known page key", () => {
    expect(getInstitutionalSlug("pt-BR", "about")).toBe("quem-somos");
    expect(getInstitutionalSlug("en", "about")).toBe("about");
    expect(getInstitutionalSlug("es", "about")).toBe("quienes-somos");
  });
});

describe("getInstitutionalPageKeyFromSlug", () => {
  it("resolves slug back to page key", () => {
    expect(getInstitutionalPageKeyFromSlug("pt-BR", "tecnologia")).toBe("technology");
    expect(getInstitutionalPageKeyFromSlug("en", "technology")).toBe("technology");
    expect(getInstitutionalPageKeyFromSlug("es", "tecnologia")).toBe("technology");
  });

  it("returns undefined for unknown slug", () => {
    expect(getInstitutionalPageKeyFromSlug("pt-BR", "no-such-page")).toBeUndefined();
  });
});

describe("localizePath", () => {
  it("translates institutional slug when switching locale", () => {
    expect(localizePath("/pt-BR/quem-somos", "en")).toBe("/en/about");
    expect(localizePath("/en/about", "es")).toBe("/es/quienes-somos");
  });

  it("falls through to the home of a locale for empty path", () => {
    expect(localizePath("/", "pt-BR")).toBe("/pt-BR");
  });

  it("preserves tail segments (e.g. cases/slug)", () => {
    expect(localizePath("/pt-BR/cases/x", "en")).toBe("/en/cases/x");
  });
});
