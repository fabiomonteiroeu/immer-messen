import { serverEnv } from "@/lib/env/server-env";
import { logger } from "@/lib/logger";

const CMS_TIMEOUT_MS = 2000;

export async function GET() {
  const cms = await probeCms();
  const body = {
    status: "ok" as const,
    uptime: process.uptime(),
    version: process.env.npm_package_version ?? "unknown",
    cms,
  };
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}

async function probeCms() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CMS_TIMEOUT_MS);

  try {
    const url = new URL("/_health", serverEnv.INTERNAL_STRAPI_URL);
    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    });
    return { reachable: response.ok, status: response.status };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    logger.warn("health.cms_unreachable", { reason });
    return { reachable: false, status: 0 };
  } finally {
    clearTimeout(timeout);
  }
}
