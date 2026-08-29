import { describe, expect, it } from "vitest";

import {
  getInstitutionalPageKeyFromSlug,
  getInstitutionalSlug,
  localizePath,
} from "@/lib/cms/page-routes";

describe("getInstitutionalSlug", () => {
  it("returns localized slug for known page key", () => {
    expect(getInstitutionalSlug("pt-BR", "technology")).toBe("tecnologia");
    expect(getInstitutionalSlug("en", "technology")).toBe("technology");
    expect(getInstitutionalSlug("es", "home")).toBe("inicio");
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
    expect(localizePath("/pt-BR/tecnologia", "en")).toBe("/en/technology");
    expect(localizePath("/en/home", "es")).toBe("/es/inicio");
  });

  it("keeps an unknown slug as-is (ex: quem-somos, que virou ancora na home)", () => {
    expect(localizePath("/pt-BR/quem-somos", "en")).toBe("/en/quem-somos");
  });

  it("falls through to the home of a locale for empty path", () => {
    expect(localizePath("/", "pt-BR")).toBe("/pt-BR");
  });

  it("preserves tail segments (e.g. cases/slug)", () => {
    expect(localizePath("/pt-BR/cases/x", "en")).toBe("/en/cases/x");
  });
});
