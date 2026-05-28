import type { NextConfig } from "next";
import path from "node:path";

function strapiOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:1337";
  }
}

function buildCsp(): string {
  const strapi = strapiOrigin();
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      ...(process.env.NODE_ENV === "development" ? ["'unsafe-eval'"] : []),
      "static.elfsight.com",
      "service.elfsight.com",
      "*.elfsight.com",
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      "https://images.unsplash.com",
      "https://*.elfsight.com",
      "https://*.licdn.com",
      strapi,
    ],
    "media-src": ["'self'", strapi],
    "font-src": ["'self'", "data:"],
    "connect-src": ["'self'", strapi, "https://*.elfsight.com"],
    "frame-src": ["'self'", "https://*.elfsight.com", "https://www.linkedin.com"],
    "frame-ancestors": ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
  };

  return Object.entries(directives)
    .map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
    .join("; ");
}

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: buildCsp() },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "..", ".."),
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
