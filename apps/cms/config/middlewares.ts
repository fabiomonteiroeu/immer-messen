function toOrigins(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default ({ env }: { env: (key: string, fallback?: string | number | boolean) => string }) => [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", ...toOrigins(env("CORS_ALLOWED_ORIGINS", "http://localhost:3000"))],
          "img-src": ["'self'", "data:", "blob:", ...toOrigins(env("CORS_ALLOWED_ORIGINS", "http://localhost:3000"))],
          "media-src": ["'self'", "data:", "blob:", ...toOrigins(env("CORS_ALLOWED_ORIGINS", "http://localhost:3000"))],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: toOrigins(env("CORS_ALLOWED_ORIGINS", "http://localhost:3000")),
      headers: "*",
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      formLimit: "10mb",
      jsonLimit: "10mb",
      textLimit: "10mb",
      formidable: {
        maxFileSize: Number(env("UPLOAD_MAX_FILE_SIZE_MB", 50)) * 1024 * 1024,
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
