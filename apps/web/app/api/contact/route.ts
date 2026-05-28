import { contactSubmissionSchema, localizedContactMessages } from "@/lib/contact/schema";
import { serverEnv } from "@/lib/env/server-env";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = checkRateLimit({ key: `contact:${ip}`, limit: RATE_LIMIT, windowMs: RATE_WINDOW_MS });

  if (!limit.allowed) {
    const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));
    return Response.json(
      { ok: false, error: "rate_limit", message: localizedContactMessages["pt-BR"].rateLimit },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSubmissionSchema.safeParse(raw);
  if (!parsed.success) {
    const locale = pickLocale(raw);
    return Response.json(
      {
        ok: false,
        error: "invalid_payload",
        message: localizedContactMessages[locale].invalid,
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  if (parsed.data._hp) {
    return Response.json({ ok: false, error: "rejected" }, { status: 422 });
  }

  const locale = parsed.data.locale;
  const messages = localizedContactMessages[locale];

  try {
    await forwardSubmission(parsed.data);
  } catch (error) {
    console.error("[contact] forward failed", error);
    return Response.json({ ok: false, error: "forward_failed", message: messages.error }, { status: 502 });
  }

  return Response.json({ ok: true, message: messages.ok });
}

async function forwardSubmission(payload: import("@/lib/contact/schema").ContactSubmission) {
  const token = process.env.STRAPI_WEBHOOK_TOKEN;
  if (!token) {
    console.info("[contact] submission received (no webhook configured)", {
      name: payload.name,
      email: payload.email,
      locale: payload.locale,
    });
    return;
  }

  const url = new URL("/api/contact-submissions", serverEnv.INTERNAL_STRAPI_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { ...payload, _hp: undefined } }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`webhook ${response.status}`);
  }
}

function pickLocale(raw: unknown): "pt-BR" | "en" | "es" {
  if (raw && typeof raw === "object" && "locale" in raw) {
    const value = (raw as { locale?: unknown }).locale;
    if (value === "en" || value === "es" || value === "pt-BR") return value;
  }
  return "pt-BR";
}
