function toBytes(megabytes: number) {
  return megabytes * 1024 * 1024;
}

function toStringArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default ({ env }: { env: (key: string, fallback?: string | number | boolean) => string }) => {
  const uploadSizeMb = Number(env("UPLOAD_MAX_FILE_SIZE_MB", 50));

  return {
    upload: {
      config: {
        provider: "local",
        sizeLimit: toBytes(uploadSizeMb),
        concurrentUploadSize: Number(env("UPLOAD_CONCURRENT_LIMIT", 2)),
        security: {
          allowedTypes: [
            ...toStringArray(env("UPLOAD_ALLOWED_IMAGE_MIME", "image/jpeg,image/png,image/webp,image/avif")),
            ...toStringArray(env("UPLOAD_ALLOWED_VIDEO_MIME", "video/mp4,video/webm")),
          ],
          deniedTypes: toStringArray(env("UPLOAD_DENIED_MIME", "image/svg+xml")),
        },
      },
    },
  };
};
