# syntax=docker/dockerfile:1.7
# Build context = repo root (set in EasyPanel "Build path: .").
# Dockerfile path: apps/cms/Dockerfile

FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate
WORKDIR /workspace

# --- deps + build (needs native build tools for sharp/vips) ---
FROM base AS deps
RUN apk add --no-cache vips-dev build-base python3
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/cms/package.json apps/cms/
RUN pnpm install --filter @immer-messen/cms --frozen-lockfile

FROM deps AS build
COPY apps/cms ./apps/cms
ENV NODE_ENV=production
RUN pnpm --filter @immer-messen/cms build

# --- runtime ---
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate
RUN apk add --no-cache vips
WORKDIR /workspace
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=1337
COPY --from=build /workspace ./
EXPOSE 1337
CMD ["pnpm", "--filter", "@immer-messen/cms", "start"]
