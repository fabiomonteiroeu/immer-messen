# Deploy — Immer Messen em EasyPanel (Hostinger VPS)

Guia passo-a-passo para subir frontend (Next.js) + CMS (Strapi 5) + Postgres no EasyPanel, com SSL automático via Let's Encrypt.

| Camada      | URL pública                          | Serviço EasyPanel | Porta interna |
|-------------|--------------------------------------|-------------------|---------------|
| Frontend    | https://immer.fabiomonteiro.cloud    | `web`             | 3000          |
| CMS (admin) | https://cms.fabiomonteiro.cloud      | `cms`             | 1337          |
| Postgres    | (interno, sem domínio público)       | `db`              | 5432          |

Repo: https://github.com/fabiomonteiroeu/immer-messen — branch `main`.

---

## Pré-requisitos

- [x] DNS dos dois subdomínios apontados para o IP da VPS (já feito).
- [x] Projeto EasyPanel criado (vamos chamar de `immer-messen` neste guia).
- [ ] EasyPanel autenticado com GitHub (qualquer um destes serve):
  - GitHub App (preferido — auto-deploy nativo)
  - Deploy Key SSH (você cola a public key em GitHub → Settings → Deploy Keys)

Para autenticar no GitHub: EasyPanel → **Settings → Source Providers → GitHub → Connect**.

---

## Passo 0 — Gerar os secrets de produção

Rode local **uma vez**:

```bash
node scripts/generate-prod-secrets.mjs > /tmp/prod-secrets.env
```

Abra `/tmp/prod-secrets.env` num editor. Você vai colar trechos dele em cada serviço do EasyPanel nas próximas etapas. **Apague o arquivo depois.**

Observe os campos comentados como **"TEM que ser idêntica"** — isso vale para `POSTGRES_PASSWORD` (compartilhada entre o serviço Postgres e o `DATABASE_PASSWORD` do CMS) e `REVALIDATE_SECRET` (compartilhada entre CMS e Web).

---

## Passo 1 — Criar o serviço Postgres (PRIMEIRO)

EasyPanel → Project `immer-messen` → **+ Service → Database → Postgres**.

**Configuração:**

| Campo               | Valor                             |
|---------------------|-----------------------------------|
| Service Name        | `db`                              |
| Image               | `postgres:16-alpine`              |
| Database            | `immer_messen`                    |
| User                | `immer`                           |
| Password            | (cole o `POSTGRES_PASSWORD` do passo 0) |
| Exposed             | ❌ desligado (não precisa expor)  |

Clica **Create**. Espere o status virar **Running** (1–2 min).

**Anote o "Internal Host"** — formato `<projeto>_<servico>`, geralmente `immer-messen_db`. É o que vai virar `DATABASE_HOST` no CMS.

---

## Passo 2 — Criar o serviço CMS (Strapi)

EasyPanel → Project → **+ Service → App**.

### 2.1 — Source

| Campo            | Valor                                                  |
|------------------|--------------------------------------------------------|
| Service Name     | `cms`                                                  |
| Source Type      | Git                                                    |
| Provider         | GitHub                                                 |
| Repository       | `fabiomonteiroeu/immer-messen`                         |
| Branch           | `main`                                                 |

### 2.2 — Build

| Campo            | Valor                                                  |
|------------------|--------------------------------------------------------|
| Build Method     | Dockerfile                                             |
| Build Path       | `.`                                                    |
| Dockerfile Path  | `apps/cms/Dockerfile`                                  |

### 2.3 — Network / Domain

| Campo            | Valor                                                  |
|------------------|--------------------------------------------------------|
| Port             | `1337`                                                 |
| Domain           | `cms.fabiomonteiro.cloud`                              |
| HTTPS            | ✅ Let's Encrypt (auto)                                |

### 2.4 — Volume persistente (uploads)

EasyPanel → service `cms` → **Mounts → + Mount → Volume**.

| Campo            | Valor                                                  |
|------------------|--------------------------------------------------------|
| Type             | Volume                                                 |
| Name             | `cms-uploads`                                          |
| Mount Path       | `/workspace/apps/cms/public/uploads`                   |

**Sem esse volume, todas as imagens cadastradas somem a cada redeploy.**

### 2.5 — Environment variables

Cole o bloco "CMS service env vars" do `/tmp/prod-secrets.env`. Verifique:

- `DATABASE_HOST` bate com o internal host do Postgres (passo 1).
- `DATABASE_PASSWORD` é igual ao `POSTGRES_PASSWORD` do passo 1.
- `WEB_REVALIDATE_URL` referencia o nome interno do serviço web (`immer-messen_web` por padrão).
- `CORS_ALLOWED_ORIGINS=https://immer.fabiomonteiro.cloud`

### 2.6 — Deploy

Clica **Deploy**. Acompanhe os logs em **Deployments → Logs**. Primeiro build leva ~5–8 min (instala pnpm, sharp/vips, builda admin do Strapi).

### 2.7 — Smoke test

```bash
curl -I https://cms.fabiomonteiro.cloud/admin
# Esperado: HTTP/2 200
```

Abra `https://cms.fabiomonteiro.cloud/admin` no browser. Você verá a tela de criar o primeiro usuário admin (porque o DB está vazio). **Crie o admin agora** — anote email/senha.

---

## Passo 3 — Criar o serviço Web (Next.js)

EasyPanel → Project → **+ Service → App**.

### 3.1 — Source

Mesmo repo, mesma branch.

### 3.2 — Build

| Campo            | Valor                                                  |
|------------------|--------------------------------------------------------|
| Service Name     | `web`                                                  |
| Build Method     | Dockerfile                                             |
| Build Path       | `.`                                                    |
| Dockerfile Path  | `apps/web/Dockerfile`                                  |

### 3.3 — Network / Domain

| Campo            | Valor                                                  |
|------------------|--------------------------------------------------------|
| Port             | `3000`                                                 |
| Domain           | `immer.fabiomonteiro.cloud`                            |
| HTTPS            | ✅ Let's Encrypt (auto)                                |

### 3.4 — Environment variables

Cole o bloco "Web service env vars" do `/tmp/prod-secrets.env`. Verifique:

- `NEXT_PUBLIC_STRAPI_URL=https://cms.fabiomonteiro.cloud`
- `INTERNAL_STRAPI_URL=http://immer-messen_cms:1337` (rede interna entre serviços)
- `REVALIDATE_SECRET` é o **mesmo** valor que pus no CMS no passo 2.5

### 3.5 — Deploy

**Deploy** → logs → ~4–6 min.

### 3.6 — Smoke test

```bash
curl -I https://immer.fabiomonteiro.cloud/pt-BR
# Esperado: HTTP/2 200
```

A página vai abrir vazia / com erros de "page not found" porque o CMS ainda não tem conteúdo. Hora de seedar.

---

## Passo 4 — Popular o conteúdo

Veja [`SEED-PRODUCTION.md`](./SEED-PRODUCTION.md).

Resumo: rode `seed-import.mjs` do seu local apontando para o CMS de produção. O script é idempotente (upsert por slug/pageKey).

---

## Passo 5 — Auto-deploy

Em cada serviço (cms e web): **Deployments → Settings → Auto-Deploy → ON**.

Depois disso, todo `git push origin main` rebuilda o serviço afetado. Tipicamente:
- Mexeu em `apps/web/` → rebuilda só web.
- Mexeu em `apps/cms/` → rebuilda só cms.
- Mexeu em `package.json`/`pnpm-lock.yaml`/`pnpm-workspace.yaml` → ambos rebuildam.

---

## Passo 6 — Webhook de revalidação do Next.js (opcional)

Sem isso, mudanças no Strapi aparecem no Next só após 60s (revalidate cache). Com webhook, ficam imediatas.

CMS admin → **Settings → Global settings → Webhooks → + Create new webhook**:

- **Name:** `next-revalidate`
- **URL:** `http://immer-messen_web:3000/api/revalidate` (interno, mais rápido) **ou** `https://immer.fabiomonteiro.cloud/api/revalidate`
- **Events:** marque `Entry → Create / Update / Delete / Publish / Unpublish` e `Media → Create / Update / Delete`
- **Headers:** o endpoint exige um header `x-revalidate-signature` com HMAC. Sem custom code no Strapi, configure um proxy ou faça um plugin Strapi para assinar — fica para uma fase posterior. Por enquanto a revalidação por TTL (60s) já cobre o caso.

---

## Troubleshooting

### CMS não sobe — `connection refused` no Postgres
- Confira `DATABASE_HOST` — tem que bater **exatamente** com o internal host que aparece em EasyPanel no serviço `db`.
- Confira que o Postgres está **Running** antes de o CMS subir.

### CMS sobe mas admin dá 502
- Veja logs: `EasyPanel → cms → Logs`. Provavelmente erro de build do admin panel — pode ser falta de memória da VPS (Strapi build precisa ~2GB RAM no momento do build).
- Soluções: aumentar VPS, ou adicionar `NODE_OPTIONS=--max-old-space-size=2048` no env do CMS.

### Web sobe mas página dá erro de CMS
- Confira `NEXT_PUBLIC_STRAPI_URL` (deve ser HTTPS, sem barra no fim).
- Confira `INTERNAL_STRAPI_URL` — Next usa essa pelo backend. Se errar o nome do serviço, falha silenciosa.

### Imagens não aparecem
- Confira que o volume `/workspace/apps/cms/public/uploads` está montado.
- Confira CORS: `CORS_ALLOWED_ORIGINS=https://immer.fabiomonteiro.cloud` no CMS.
- Confira CSP do Next: a `apps/web/next.config.ts` já libera `NEXT_PUBLIC_STRAPI_URL` no `img-src`, mas se o domínio mudar, precisa rebuildar o web.

### Imagens do Strapi vêm como `http://localhost:1337/uploads/...` em produção
- O Strapi serve uploads como path relativo por padrão. O frontend resolve via `resolveMediaUrl()` em `apps/web/lib/cms/media.ts` usando `NEXT_PUBLIC_STRAPI_URL`. Se aparecer com host errado, é cache do Next — força revalidação ou reinicia o serviço web.

### Hostname interno errado
- EasyPanel mostra o hostname interno em cada service (campo `Internal Host`). Se for diferente de `immer-messen_<servico>`, ajuste:
  - CMS: `DATABASE_HOST`, `WEB_REVALIDATE_URL`
  - Web: `INTERNAL_STRAPI_URL`

### Container entra em loop de restart após adicionar env vars
- **Causa típica:** você colou no campo Environment vars que JÁ ESTÃO no Dockerfile (`NODE_ENV`, `PORT`, `HOST`, `HOSTNAME`, `NEXT_TELEMETRY_DISABLED`). Redefinir `HOSTNAME=0.0.0.0` em runtime quebra o DNS interno do EasyPanel — o roteador não consegue mais encontrar o container.
- **Fix:** abra o serviço afetado → Ambiente → **remova** essas variáveis. Salva → redeploya.
- O script `generate-prod-secrets.mjs` já omite essas variáveis automaticamente.

### Deploy falha no build de pnpm
- Erro tipo `ERR_PNPM_NO_LOCKFILE`: verifique que `pnpm-lock.yaml` está commitado (está).
- Erro tipo `ERR_PNPM_FROZEN_LOCKFILE_WITH_OUTDATED_LOCKFILE`: rode local `pnpm install`, comite o `pnpm-lock.yaml` atualizado e empurre.

---

## Rollback

EasyPanel mantém histórico de deploys. Para reverter:

`<servico> → Deployments → <deploy anterior> → Redeploy`

Ou via git:

```bash
git revert <sha-do-commit-ruim>
git push origin main
# auto-deploy aciona rebuild
```

---

## Custos / dimensionamento estimado

- **Postgres:** ~256–512 MB RAM ocioso, ~1 GB pico durante seed grande.
- **CMS:** ~512 MB–1 GB RAM em runtime; **2 GB durante build** (admin panel webpack).
- **Web:** ~256 MB RAM em runtime (Next standalone é leve).

Mínimo recomendado da VPS: **4 GB RAM** (folga pra build simultâneo + Postgres + S.O.).

---

## Próximos passos depois do MVP

- Migrar uploads pra S3/R2 com `@strapi/provider-upload-aws-s3` (elimina dependência de volume local).
- Configurar backup automático do Postgres (EasyPanel tem schedule).
- Setar `NODE_ENV=production` no Next (já está) + verificar lighthouse local com `pnpm test:lhci`.
- Habilitar webhook de revalidação com assinatura HMAC (escrever extensão Strapi pequena pra calcular).
