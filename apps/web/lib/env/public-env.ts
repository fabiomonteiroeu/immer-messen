import { z } from "zod";

import { supportedLocales } from "@/lib/i18n/config";

const localeListSchema = z
  .string()
  .min(2)
  .transform((value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.enum(supportedLocales)).min(1));

const publicEnvSchema = z
  .object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_STRAPI_URL: z.url(),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(supportedLocales),
  NEXT_PUBLIC_SUPPORTED_LOCALES: localeListSchema,
})
  .superRefine((value, ctx) => {
    if (!value.NEXT_PUBLIC_SUPPORTED_LOCALES.includes(value.NEXT_PUBLIC_DEFAULT_LOCALE)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Default locale must be included in NEXT_PUBLIC_SUPPORTED_LOCALES",
        path: ["NEXT_PUBLIC_DEFAULT_LOCALE"],
      });
    }
  });

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337",
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "pt-BR",
  NEXT_PUBLIC_SUPPORTED_LOCALES:
    process.env.NEXT_PUBLIC_SUPPORTED_LOCALES ?? supportedLocales.join(","),
});

export type PublicEnv = typeof publicEnv;
