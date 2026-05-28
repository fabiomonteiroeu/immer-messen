type LogLevel = "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

function emit(level: LogLevel, msg: string, ctx?: LogContext) {
  const entry = { ts: new Date().toISOString(), level, msg, ...(ctx ?? {}) };
  const line = JSON.stringify(entry);
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (msg: string, ctx?: LogContext) => emit("info", msg, ctx),
  warn: (msg: string, ctx?: LogContext) => emit("warn", msg, ctx),
  error: (msg: string, ctx?: LogContext) => emit("error", msg, ctx),
};
