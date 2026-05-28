# syntax=docker/dockerfile:1.7
# Build context = repo root (set in EasyPanel "Build path: .").
# Dockerfile path: apps/web/Dockerfile

FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate
WORKDIR /workspace

# --- deps (cacheable layer) ---
FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json apps/web/
RUN pnpm install --filter @immer-messen/web --frozen-lockfile

# --- build ---
FROM deps AS build
# NEXT_PUBLIC_* precisam estar disponíveis em build-time pois são inlined no bundle
# e no CSP. EasyPanel passa env vars como --build-arg automaticamente.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
ARG NEXT_PUBLIC_DEFAULT_LOCALE=pt-BR
ARG NEXT_PUBLIC_SUPPORTED_LOCALES=pt-BR,en,es
ARG NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL \
    NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE \
    NEXT_PUBLIC_SUPPORTED_LOCALES=$NEXT_PUBLIC_SUPPORTED_LOCALES \
    NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID=$NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID \
    NEXT_TELEMETRY_DISABLED=1
COPY apps/web ./apps/web
RUN pnpm --filter @immer-messen/web build

# --- runtime (standalone Next.js output) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build --chown=nextjs:nodejs /workspace/apps/web/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /workspace/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /workspace/apps/web/public ./apps/web/public
USER nextjs
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
