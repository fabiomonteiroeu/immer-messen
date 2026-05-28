import { describe, expect, it } from "vitest";

import { contactSubmissionSchema } from "@/lib/contact/schema";

describe("contactSubmissionSchema", () => {
  it("accepts a minimal valid payload", () => {
    const parsed = contactSubmissionSchema.safeParse({
      name: "Maria",
      email: "maria@example.com",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.locale).toBe("pt-BR");
    }
  });

  it("rejects invalid email", () => {
    expect(
      contactSubmissionSchema.safeParse({ name: "x", email: "not-an-email" }).success,
    ).toBe(false);
  });

  it("rejects HTML in name field", () => {
    expect(
      contactSubmissionSchema.safeParse({ name: "<script>", email: "a@b.com" }).success,
    ).toBe(false);
  });

  it("rejects filled honeypot", () => {
    expect(
      contactSubmissionSchema.safeParse({ name: "x", email: "a@b.com", _hp: "bot" }).success,
    ).toBe(false);
  });

  it("allows empty honeypot string", () => {
    const parsed = contactSubmissionSchema.safeParse({
      name: "x",
      email: "a@b.com",
      _hp: "",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects unsupported locale", () => {
    expect(
      contactSubmissionSchema.safeParse({ name: "x", email: "a@b.com", locale: "fr" }).success,
    ).toBe(false);
  });
});
