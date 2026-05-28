# Seed Strategy

The initial CMS seed lives as a versioned artifact in `apps/cms/scripts/seed-content.mjs` and is pushed to Strapi by `apps/cms/scripts/seed-import.mjs`.

## What is included

- `global-setting`, `footer` and `cookie-banner` for `pt-BR`, `en` and `es` (with proper accentuation).
- Institutional `page` entries for `home`, `technology`, `solutions`, `about`, `contact` and `lgpd` — full editorial copy in all three locales.
- `application-area` catalog (8 entries × 3 locales).
- `partner` catalog (7 entries, language-neutral).
- `news-article` (6 entries × 3 locales) and `case-study` (4 entries × 3 locales).

## Validate the artifact

```bash
pnpm --filter @immer-messen/cms seed:check
```

Prints counts and validation errors if any required entry is missing.

## Run the import

1. Start Strapi (`pnpm --filter @immer-messen/cms dev` or via Docker).
2. In `http://localhost:1337/admin/settings/api-tokens`, create a token:
   - Name: `seed-importer`
   - Token duration: any
   - Token type: **Full access**
3. Export the token and run:

   ```bash
   export STRAPI_API_TOKEN=<paste-token-here>
   pnpm --filter @immer-messen/cms seed:import
   ```

   Optional: `STRAPI_URL=http://localhost:1337` (default), `SEED_VERBOSE=1` for per-asset logs.

The importer is idempotent: it looks up existing entries by stable keys (file name for media, slug or name for content) and updates instead of duplicating. Safe to re-run after edits.

### What the importer does

1. Uploads every entry from `assetManifest.readyAssets` to the Media Library (reusing if already there).
2. Upserts `global-setting`, `footer`, `cookie-banner` per locale and publishes.
3. Upserts `partners` (language-neutral), then `application-areas`, `news-articles`, `case-studies` in all locales.
4. Resolves cross-entity relations and per-block asset slots, then upserts every `page` per locale.

## Asset policy

- `assetManifest.readyAssets` lists local files in `layout-aprovado/assets/` that get uploaded automatically.
- `assetManifest.placeholderAssetsToReplace` lists external placeholders that still need real images before launch.

## Current limits

- Case galleries and inline page images still need richer block modeling.
- EN and ES editorial copy is a translation in draft state and should be reviewed before launch.
