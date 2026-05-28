import { describe, expect, it, vi } from "vitest";

import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

describe("rate-limit", () => {
  it("allows requests under the limit", () => {
    const key = `test:${Math.random()}`;
    const r1 = checkRateLimit({ key, limit: 3, windowMs: 1000 });
    const r2 = checkRateLimit({ key, limit: 3, windowMs: 1000 });
    expect(r1.allowed).toBe(true);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(1);
  });

  it("blocks once limit is reached", () => {
    const key = `test:${Math.random()}`;
    checkRateLimit({ key, limit: 2, windowMs: 1000 });
    checkRateLimit({ key, limit: 2, windowMs: 1000 });
    const blocked = checkRateLimit({ key, limit: 2, windowMs: 1000 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("resets after windowMs", () => {
    vi.useFakeTimers();
    const key = `test:${Math.random()}`;
    checkRateLimit({ key, limit: 1, windowMs: 100 });
    expect(checkRateLimit({ key, limit: 1, windowMs: 100 }).allowed).toBe(false);
    vi.setSystemTime(Date.now() + 150);
    expect(checkRateLimit({ key, limit: 1, windowMs: 100 }).allowed).toBe(true);
    vi.useRealTimers();
  });
});

describe("getClientIp", () => {
  it("extracts first IP from x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(getClientIp(headers)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    const headers = new Headers({ "x-real-ip": "9.8.7.6" });
    expect(getClientIp(headers)).toBe("9.8.7.6");
  });

  it("returns unknown when no header present", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});
