# Deploy — EasyPanel (Hostinger VPS)

Domínios já apontados:
- `immer.fabiomonteiro.cloud` → frontend Next.js
- `cms.fabiomonteiro.cloud` → Strapi admin/API

## 1. Pré-requisitos no EasyPanel

- Projeto criado (vamos chamar de `immer-messen`).
- Acesso à conta GitHub do repo (`fabiomonteiroeu/immer-messen`) — EasyPanel pode autenticar via GitHub App ou Deploy Key.

## 2. Postgres (criar primeiro — outros serviços dependem)

EasyPanel → Project → **+ Service → Database → Postgres**.

- **Service Name:** `db`
- **Image:** `postgres:16-alpine` (ou versão equivalente disponível)
- **Database:** `immer_messen`
- **User:** `immer`
- **Password:** gere uma forte (anote)
- **Volume:** já vem persistente por padrão

Anote o **Internal Host** que o EasyPanel gera (formato `<projeto>_<servico>`, ex.: `immer-messen_db`). Vai entrar no env do CMS como `DATABASE_HOST`.

## 3. CMS (Strapi)

EasyPanel → Project → **+ Service → App → From Source (GitHub)**.

- **Service Name:** `cms`
- **Source:** `github.com/fabiomonteiroeu/immer-messen` branch `main`
- **Build:** Dockerfile
  - **Build Path:** `.` (raiz do repo)
  - **Dockerfile Path:** `apps/cms/Dockerfile`
- **Port:** `1337`
- **Domain:** `cms.fabiomonteiro.cloud` (HTTPS auto via Let's Encrypt)
- **Volume (importante — uploads persistentes):**
  - Mount: `/workspace/apps/cms/public/uploads`
  - Tipo: Volume nomeado (ex.: `cms-uploads`)

### Env vars do CMS

Gere segredos fortes (32+ bytes random base64) para todos os `*_SECRET`, `*_SALT`, `*_KEY` antes de colar. Sugestão: `openssl rand -base64 32`.

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

APP_KEYS=<gere 4 chaves separadas por vírgula>
API_TOKEN_SALT=<random 32 bytes>
ADMIN_JWT_SECRET=<random 32 bytes>
TRANSFER_TOKEN_SALT=<random 32 bytes>
JWT_SECRET=<random 32 bytes>
ADMIN_ENCRYPTION_KEY=<random 32 bytes>

DATABASE_CLIENT=postgres
DATABASE_HOST=immer-messen_db        # nome interno do serviço Postgres
DATABASE_PORT=5432
DATABASE_NAME=immer_messen
DATABASE_USERNAME=immer
DATABASE_PASSWORD=<a senha que você anotou>
DATABASE_SSL=false

CORS_ALLOWED_ORIGINS=https://immer.fabiomonteiro.cloud
WEB_REVALIDATE_URL=http://immer-messen_web:3000/api/revalidate
REVALIDATE_SECRET=<random 32 bytes — mesma string usada no web>
STRAPI_WEBHOOK_TOKEN=<random 32 bytes>

UPLOAD_MAX_FILE_SIZE_MB=50
UPLOAD_CONCURRENT_LIMIT=2
UPLOAD_DENIED_MIME=image/svg+xml
```

**Primeiro deploy:** após o container subir, abra `https://cms.fabiomonteiro.cloud/admin`, crie o usuário admin (form aparece se o DB está vazio), e em `Settings → API Tokens` gere um token Full Access — você vai precisar dele se quiser rodar o seed-import.

## 4. Frontend (Next.js)

EasyPanel → Project → **+ Service → App → From Source (GitHub)**.

- **Service Name:** `web`
- **Source:** mesmo repo, branch `main`
- **Build:** Dockerfile
  - **Build Path:** `.`
  - **Dockerfile Path:** `apps/web/Dockerfile`
- **Port:** `3000`
- **Domain:** `immer.fabiomonteiro.cloud`

### Env vars do Web

```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_TELEMETRY_DISABLED=1

NEXT_PUBLIC_SITE_URL=https://immer.fabiomonteiro.cloud
NEXT_PUBLIC_STRAPI_URL=https://cms.fabiomonteiro.cloud
INTERNAL_STRAPI_URL=http://immer-messen_cms:1337   # interno entre serviços
NEXT_PUBLIC_DEFAULT_LOCALE=pt-BR
NEXT_PUBLIC_SUPPORTED_LOCALES=pt-BR,en,es

PREVIEW_SECRET=<random 32 bytes>
REVALIDATE_SECRET=<mesma string que pus no CMS>
NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID=
```

## 5. Webhook de revalidação (opcional, depois)

Strapi → `Settings → Webhooks → Create new webhook`:
- URL: `http://immer-messen_web:3000/api/revalidate` (interna) **ou** `https://immer.fabiomonteiro.cloud/api/revalidate` (pública)
- Eventos: `entry.publish`, `entry.update`, `entry.unpublish`, `entry.delete`
- Header: `x-revalidate-signature: <HMAC do body com REVALIDATE_SECRET>`

(A assinatura HMAC é montada por `apps/web/lib/cms/revalidation.ts` — pode ser feita por uma extensão de Strapi ou substituída por chamada direta ao endpoint protegido por token simples.)

## 6. Auto-deploy

EasyPanel → cada serviço → **Deployments → Auto-Deploy: ON**. A partir daí, cada push em `main` rebuilda + republica.

## 7. Verificação

- `https://cms.fabiomonteiro.cloud/admin` → tela de admin do Strapi
- `https://cms.fabiomonteiro.cloud/api/pages?locale=pt-BR` → JSON (provavelmente vazio até você cadastrar conteúdo)
- `https://immer.fabiomonteiro.cloud/pt-BR` → home
- `https://immer.fabiomonteiro.cloud/pt-BR/quem-somos` → about

## 8. Popular conteúdo

Duas opções:
1. **Seed via script** (do seu local apontando para o CMS de produção):
   ```bash
   STRAPI_URL=https://cms.fabiomonteiro.cloud \
   STRAPI_API_TOKEN=<token Full Access criado no admin> \
   node apps/cms/scripts/seed-import.mjs
   ```
   Limitação conhecida: relations dentro de componentes de dynamic-zone (ex.: `partners-block.partners`) não persistem via REST em Strapi 5 — o frontend já tem fallback que busca de `/api/partners`.

2. **Cadastrar manualmente** no admin do Strapi.

## 9. Mídia e uploads

Por enquanto está usando o filesystem do container montado em volume. Para mais resiliência (multi-instância, backup), migrar pro `@strapi/provider-upload-aws-s3` apontando para um bucket S3/R2 — não está no escopo deste deploy inicial.
