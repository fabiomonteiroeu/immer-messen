import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";

import { serverEnv } from "@/lib/env/server-env";

function isSafeRelativePath(path: string): boolean {
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  try {
    new URL(path);
    return false;
  } catch {
    return true;
  }
}

function compareSecret(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret") ?? "";
  const path = url.searchParams.get("path") ?? "/pt-BR";

  if (!compareSecret(secret, serverEnv.PREVIEW_SECRET)) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!isSafeRelativePath(path)) {
    return new Response("Invalid path", { status: 400 });
  }

  (await draftMode()).enable();
  redirect(path);
}
