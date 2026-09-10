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
# NEXT_PUBLIC_* precisam estar disponíveis em build-time porque são inlined no bundle
# do cliente quando referenciados em client component.
#
# NÃO valem para o CSP: ele é montado em `headers()` do next.config.ts, avaliado em
# runtime pelo server standalone — em 2026-09-10 o build rodou com o default localhost
# e mesmo assim a produção serviu `https://cms.fabiomonteiro.cloud` no header.
#
# INTERNAL_STRAPI_URL é a que importa para o build de verdade: `lib/cms/client.ts`
# escolhe a base por `typeof window === "undefined"`, então TODA requisição ao CMS
# durante `next build` (generateStaticParams, sitemap, prerender) usa esta variável.
# Sem ela o build inteiro dá ECONNREFUSED contra localhost:1337, cai no mock e não
# pré-renderiza nada de útil — foi o que encheu o log do deploy de 2026-09-10 com
# centenas de "fetch failed". O default local existe só para `docker build` na máquina.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
ARG NEXT_PUBLIC_DEFAULT_LOCALE=pt-BR
ARG NEXT_PUBLIC_SUPPORTED_LOCALES=pt-BR,en,es
ARG NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID=
ARG INTERNAL_STRAPI_URL=http://localhost:1337
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL \
    NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE \
    NEXT_PUBLIC_SUPPORTED_LOCALES=$NEXT_PUBLIC_SUPPORTED_LOCALES \
    NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID=$NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID \
    INTERNAL_STRAPI_URL=$INTERNAL_STRAPI_URL \
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
