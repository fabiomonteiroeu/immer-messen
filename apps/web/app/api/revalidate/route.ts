import { revalidatePath, revalidateTag } from "next/cache";

import {
  mapEventToInvalidations,
  verifyHmac,
  type RevalidationPayload,
} from "@/lib/cms/revalidation";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-revalidate-signature");

  if (!verifyHmac(rawBody, signature)) {
    return Response.json({ ok: false, error: "invalid signature" }, { status: 401 });
  }

  let payload: RevalidationPayload;
  try {
    payload = JSON.parse(rawBody) as RevalidationPayload;
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const invalidations = mapEventToInvalidations(payload);

  for (const tag of invalidations.tags) revalidateTag(tag, "default");
  for (const path of invalidations.paths) revalidatePath(path);

  console.log(
    `[revalidate] model=${payload.model} event=${payload.event} ` +
      `entry=${JSON.stringify(payload.entry ?? {})} ` +
      `tags=${JSON.stringify(invalidations.tags)} paths=${JSON.stringify(invalidations.paths)}` +
      (invalidations.skipped ? ` skipped=${invalidations.reason ?? ""}` : ""),
  );

  return Response.json({
    ok: true,
    revalidated: { tags: invalidations.tags, paths: invalidations.paths },
    skipped: invalidations.skipped ?? false,
    reason: invalidations.reason,
  });
}
