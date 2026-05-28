import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const mode = process.argv[2] ?? "lint";

const requiredFiles = [
  "package.json",
  "pnpm-workspace.yaml",
  "docker-compose.yml",
  ".env.example",
  "apps/web/package.json",
  "apps/web/tsconfig.json",
  "apps/web/app/page.tsx",
  "apps/cms/package.json",
  "apps/cms/config/server.ts",
  "apps/cms/config/database.ts",
  "README.md",
];

for (const relativePath of requiredFiles) {
  const absolutePath = resolve(relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`[${mode}] required file missing: ${relativePath}`);
  }
}

const jsonFiles = [
  "package.json",
  "apps/web/package.json",
  "apps/cms/package.json",
  "apps/web/tsconfig.json",
  "apps/cms/tsconfig.json",
];

for (const relativePath of jsonFiles) {
  JSON.parse(readFileSync(resolve(relativePath), "utf8"));
}

const rootEnv = readFileSync(resolve(".env.example"), "utf8");
const requiredEnvKeys = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_STRAPI_URL",
  "PREVIEW_SECRET",
  "REVALIDATE_SECRET",
  "POSTGRES_DB",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
];

for (const key of requiredEnvKeys) {
  if (!rootEnv.includes(`${key}=`)) {
    throw new Error(`[${mode}] missing environment contract: ${key}`);
  }
}

console.log(`[${mode}] workspace contracts validated`);
