# Populando conteúdo em produção

Depois que os serviços de [`DEPLOY.md`](./DEPLOY.md) estiverem no ar, o CMS de produção (`https://cms.fabiomonteiro.cloud`) está com o banco vazio — só com o usuário admin que você criou.

Este guia cobre três caminhos pra popular o conteúdo. **Use o que faz mais sentido pro seu fluxo.**

---

## Pré-requisito (todos os caminhos)

Crie um **API Token Full Access** no CMS de produção:

1. Logue em `https://cms.fabiomonteiro.cloud/admin`
2. **Settings → API Tokens → + Create new API Token**
3. Configure:
   - **Name:** `seed-script`
   - **Token duration:** `7 days` (ou Unlimited se preferir)
   - **Token type:** `Full access`
4. **Save → copie o token gerado** (só aparece uma vez).
5. Salve no seu shell local:
   ```bash
   export STRAPI_PROD_TOKEN="<cole o token aqui>"
   ```

---

## Caminho 1 — Seed via script (recomendado pro primeiro deploy)

Roda o `seed-import.mjs` do seu Mac apontando pra produção. O script é **idempotente**: re-executar não cria duplicatas; ele faz upsert por slug/pageKey.

```bash
cd ~/projects/immer-messen

# Dry-run primeiro pra ver o que vai acontecer (não escreve nada)
STRAPI_URL=https://cms.fabiomonteiro.cloud \
STRAPI_API_TOKEN=$STRAPI_PROD_TOKEN \
node apps/cms/scripts/seed-import.mjs --dry-run

# Se o dry-run aparece OK, roda de verdade:
STRAPI_URL=https://cms.fabiomonteiro.cloud \
STRAPI_API_TOKEN=$STRAPI_PROD_TOKEN \
node apps/cms/scripts/seed-import.mjs
```

**Quanto demora:** ~3–5 min (faz upload de ~50 imagens via REST API).

**O que faz:**
1. Sobe todos os assets de `layout-aprovado/assets/img/` + `resources/` pra `/uploads` do Strapi prod.
2. Cria/atualiza os 3 single types (`global-setting`, `footer`, `cookie-banner`) nos 3 locais (pt-BR, en, es).
3. Cria/atualiza 7 partners.
4. Cria/atualiza 8 application areas nos 3 locais.
5. Cria/atualiza notícias e cases.
6. Cria/atualiza 6 páginas (home, tecnologia, soluções, quem-somos, contato, lgpd) nos 3 locais.

**Limitação conhecida:** o `partners-block.partners` (relation dentro de dynamic-zone component) é silenciosamente descartado pelo Strapi 5 REST. O frontend já tem fallback que busca `/api/partners` direto, então os parceiros aparecem mesmo assim.

### Em seguida, roda o patch do about com a Petrobras:

```bash
STRAPI_URL=https://cms.fabiomonteiro.cloud \
STRAPI_API_TOKEN=$STRAPI_PROD_TOKEN \
node apps/cms/scripts/patch-about-content.mjs
```

Esse script:
- Cria o partner Petrobras (se não existir)
- Atualiza as 3 versões da página `about` com o `about-content-block` novo (2 linhas + highlight NVIDIA/Pioneirismo)

---

## Caminho 2 — Manual via admin do Strapi

Se preferir cadastrar tudo na mão pra ter controle total do texto, vá em `https://cms.fabiomonteiro.cloud/admin` e:

1. **Content Manager → Partner** — adicione 8 parceiros com logo, nome, URL, sortOrder.
2. **Content Manager → Application Area** — 8 áreas, cada uma nas 3 línguas (use o seletor de locale no canto superior).
3. **Content Manager → News Article** — notícias.
4. **Content Manager → Case Study** — cases.
5. **Content Manager → Page** — crie a página, escolha pageKey (home/about/etc), adicione blocos no campo `blocks` (dynamic zone). Para a página about, use o bloco `About Content Block`.
6. **Publique** cada entrada (botão Publish no canto superior direito).

**Não esqueça:** cada conteúdo precisa ser duplicado nas 3 línguas (botão de locale).

---

## Caminho 3 — Transfer do banco local pro de produção

Se você já tem todo o conteúdo no Strapi local (`http://localhost:1337`) e quer migrar exatamente como está pra produção, use o `strapi transfer` nativo. Ele copia: schemas, entries, uploads, configurações.

### 3.1 — Gerar Transfer Token na produção

CMS prod admin → **Settings → Transfer Tokens → + Create new Transfer Token**:
- Name: `incoming-from-local`
- Duration: `7 days`
- Token type: `Push only`
- **Save** → copie o token.

### 3.2 — Rodar o transfer (local → prod)

```bash
cd ~/projects/immer-messen/apps/cms

# Garante que o CMS local está rodando
pnpm dev

# Em outro terminal:
npx strapi transfer \
  --to https://cms.fabiomonteiro.cloud/admin \
  --to-token <cole o transfer token aqui>
```

Strapi pede confirmação (vai sobrescrever o conteúdo em prod). **Confirme.** Demora 5–10 min dependendo do volume de uploads.

**Atenção:** isso **apaga** todo o conteúdo atual da produção (incluindo o usuário admin se for de tipo `data + config + schema`). Recomendo só usar no primeiro deploy.

### 3.3 — Re-criar admin em produção

Após o transfer, você pode precisar recriar o admin user (se foi sobrescrito). Use `npx strapi admin:create-user` rodando dentro do container do CMS via EasyPanel terminal:

```bash
node ./node_modules/@strapi/strapi/bin/strapi.js admin:create-user \
  --firstname=Fabio --email=seu@email.com --password='SenhaForte123!'
```

---

## Comparativo

| Caminho            | Velocidade | Risco              | Quando usar                                       |
|--------------------|------------|--------------------|---------------------------------------------------|
| 1 — seed script    | Médio (~5 min) | Baixo (upsert)   | Primeiro deploy, ou re-sincronizar partes        |
| 2 — admin manual   | Lento      | Nenhum             | Quando você quer reescrever o conteúdo na hora   |
| 3 — strapi transfer| Rápido     | **Alto** (sobrescreve) | Espelho exato do local — só no primeiro deploy |

---

## Verificação pós-seed

Independente do caminho usado, rode:

```bash
# Quantas páginas no CMS prod?
curl -s -H "Authorization: Bearer $STRAPI_PROD_TOKEN" \
  "https://cms.fabiomonteiro.cloud/api/pages?locale=pt-BR" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('pages pt-BR:', d['meta']['pagination']['total'])"

# Quantos parceiros?
curl -s -H "Authorization: Bearer $STRAPI_PROD_TOKEN" \
  "https://cms.fabiomonteiro.cloud/api/partners" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('partners:', d['meta']['pagination']['total'])"

# Frontend renderiza?
curl -sI https://immer.fabiomonteiro.cloud/pt-BR/quem-somos
curl -sI https://immer.fabiomonteiro.cloud/en/about
curl -sI https://immer.fabiomonteiro.cloud/es/quienes-somos
```

Esperado: `200 OK` em todos.

Abra no browser:
- `https://immer.fabiomonteiro.cloud/pt-BR` — home com hero
- `https://immer.fabiomonteiro.cloud/pt-BR/quem-somos` — about com layout novo + 8 parceiros
- `https://immer.fabiomonteiro.cloud/pt-BR/tecnologia` — tecnologia

---

## Troubleshooting

### Seed-import: `Upload failed: 413 Payload Too Large`
- Aumente o limite no Nginx do EasyPanel: `<servico> → Advanced → Client Max Body Size: 100M`.

### Seed-import: `401 Unauthorized` em alguns endpoints
- O API token tem que ser **Full Access**, não Read-Only.
- Re-gere o token se passou da expiração.

### `partners-block.partners` continua vazio depois do seed
- Esperado — é a limitação documentada do Strapi 5. O frontend cai no fallback `/api/partners` automaticamente. Se quiser arrumar definitivamente, dá pra editar manualmente no admin de cada página (Content Manager → Page → home → Partners Block → seleciona os 8 parceiros → Save → Publish).

### Páginas aparecem só em pt-BR
- O `seed-import.mjs` cria nas 3 línguas. Se faltou alguma, abre no admin, troca o locale (topo direito), e adiciona manualmente.

### Imagens com 404
- Confirma que o volume `cms-uploads` está montado.
- Confirma que o Strapi serve `/uploads/<arquivo>.png` direto:
  ```bash
  curl -I https://cms.fabiomonteiro.cloud/uploads/<algum-arquivo>.png
  ```
