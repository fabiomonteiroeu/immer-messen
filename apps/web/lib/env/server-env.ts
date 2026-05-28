import { z } from "zod";

const serverEnvSchema = z.object({
  INTERNAL_STRAPI_URL: z.url(),
  PREVIEW_SECRET: z.string().min(10),
  REVALIDATE_SECRET: z.string().min(10),
});

export const serverEnv = serverEnvSchema.parse({
  INTERNAL_STRAPI_URL: process.env.INTERNAL_STRAPI_URL ?? "http://localhost:1337",
  PREVIEW_SECRET: process.env.PREVIEW_SECRET ?? "preview-secret-dev",
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET ?? "revalidate-secret-dev",
});

export type ServerEnv = typeof serverEnv;
