export default ({ env }: { env: (key: string, fallback?: string) => string }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "replace-with-admin-jwt-secret"),
  },
  secrets: {
    encryptionKey: env("ADMIN_ENCRYPTION_KEY", "replace-with-admin-encryption-key"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "replace-with-api-token-salt"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "replace-with-transfer-token-salt"),
    },
  },
});
