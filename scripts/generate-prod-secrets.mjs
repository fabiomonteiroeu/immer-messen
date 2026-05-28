#!/usr/bin/env node
// Generates all the secrets you need to paste in EasyPanel for the CMS + Web services.
// Run: node scripts/generate-prod-secrets.mjs
//
// Pipe to a file if you want: node scripts/generate-prod-secrets.mjs > /tmp/prod-secrets.env
// (DELETE that file after you finish pasting in EasyPanel.)

import { randomBytes } from "node:crypto";

const r = (bytes = 32) => randomBytes(bytes).toString("base64").replace(/=+$/, "");

const appKeys = Array.from({ length: 4 }, () => r(24)).join(",");
const apiTokenSalt = r(32);
const adminJwtSecret = r(32);
const transferTokenSalt = r(32);
const jwtSecret = r(32);
const adminEncryptionKey = r(32);
const strapiWebhookToken = r(32);
const revalidateSecret = r(32);
const previewSecret = r(32);
const postgresPassword = r(24);

console.log(`
# ─── Postgres (EasyPanel "Database → Postgres" service) ───
POSTGRES_DB=immer_messen
POSTGRES_USER=immer
POSTGRES_PASSWORD=${postgresPassword}

# ─── CMS service env vars (EasyPanel App → cms) ───
# NOTA: NÃO defina HOST, PORT, NODE_ENV aqui — já estão no Dockerfile.
# Redefinir em runtime confunde o roteamento interno do EasyPanel.
APP_KEYS=${appKeys}
API_TOKEN_SALT=${apiTokenSalt}
ADMIN_JWT_SECRET=${adminJwtSecret}
TRANSFER_TOKEN_SALT=${transferTokenSalt}
JWT_SECRET=${jwtSecret}
ADMIN_ENCRYPTION_KEY=${adminEncryptionKey}
DATABASE_CLIENT=postgres
DATABASE_HOST=immer-messen_db
DATABASE_PORT=5432
DATABASE_NAME=immer_messen
DATABASE_USERNAME=immer
DATABASE_PASSWORD=${postgresPassword}
DATABASE_SSL=false
CORS_ALLOWED_ORIGINS=https://immer.fabiomonteiro.cloud
WEB_REVALIDATE_URL=http://immer-messen_web:3000/api/revalidate
REVALIDATE_SECRET=${revalidateSecret}
STRAPI_WEBHOOK_TOKEN=${strapiWebhookToken}
UPLOAD_MAX_FILE_SIZE_MB=50
UPLOAD_CONCURRENT_LIMIT=2
UPLOAD_DENIED_MIME=image/svg+xml

# ─── Web service env vars (EasyPanel App → web) ───
# NOTA: NÃO defina NODE_ENV, PORT, HOSTNAME, NEXT_TELEMETRY_DISABLED aqui — já estão no Dockerfile.
# Redefinir HOSTNAME=0.0.0.0 em runtime quebra o roteamento interno do EasyPanel.
NEXT_PUBLIC_SITE_URL=https://immer.fabiomonteiro.cloud
NEXT_PUBLIC_STRAPI_URL=https://cms.fabiomonteiro.cloud
INTERNAL_STRAPI_URL=http://immer-messen_cms:1337
NEXT_PUBLIC_DEFAULT_LOCALE=pt-BR
NEXT_PUBLIC_SUPPORTED_LOCALES=pt-BR,en,es
PREVIEW_SECRET=${previewSecret}
REVALIDATE_SECRET=${revalidateSecret}
NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID=

# ─── IMPORTANT ───
# 1. POSTGRES_PASSWORD aparece duas vezes (no Postgres service e no DATABASE_PASSWORD do CMS) — TEM que ser idêntica.
# 2. REVALIDATE_SECRET aparece duas vezes (CMS e Web) — TEM que ser idêntica.
# 3. Não comite este arquivo nem cole em chat público.
# 4. Se a internal hostname do seu projeto EasyPanel for diferente de "immer-messen_db" / "immer-messen_cms" / "immer-messen_web",
#    ajuste DATABASE_HOST, INTERNAL_STRAPI_URL e WEB_REVALIDATE_URL conforme o nome que aparecer em EasyPanel.
# 5. NUNCA cole HOST, PORT, NODE_ENV, HOSTNAME ou NEXT_TELEMETRY_DISABLED como env vars no EasyPanel.
#    Esses já estão no Dockerfile e redefini-los em runtime quebra o container.
`.trim());
