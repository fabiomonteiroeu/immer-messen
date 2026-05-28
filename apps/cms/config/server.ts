export default ({ env }: { env: (key: string, fallback?: string | number | boolean) => string }) => ({
  host: env("HOST", "0.0.0.0"),
  port: Number(env("PORT", 1337)),
  app: {
    keys: env("APP_KEYS", "replace-me-1,replace-me-2,replace-me-3,replace-me-4").split(","),
  },
});
