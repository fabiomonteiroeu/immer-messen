export default ({ env }: { env: (key: string, fallback?: string | number | boolean) => string }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "postgres"),
    connection: {
      host: env("DATABASE_HOST", "db"),
      port: Number(env("DATABASE_PORT", 5432)),
      database: env("DATABASE_NAME", "immer_messen"),
      user: env("DATABASE_USERNAME", "immer"),
      password: env("DATABASE_PASSWORD", "replace-with-postgres-password"),
      ssl: env("DATABASE_SSL", "false") === "true",
    },
  },
});
