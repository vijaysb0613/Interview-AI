import "server-only";

type LogContext = Record<string, unknown>;

function toErrorContext(error: unknown): LogContext {
  if (error instanceof Error) {
    return { errorMessage: error.message, errorStack: error.stack };
  }
  return { errorMessage: String(error) };
}

function write(level: "info" | "warn" | "error", msg: string, context?: LogContext) {
  const entry = { level, msg, timestamp: new Date().toISOString(), ...context };
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
  info: (msg: string, context?: LogContext) => write("info", msg, context),
  warn: (msg: string, context?: LogContext) => write("warn", msg, context),
  error: (msg: string, error?: unknown, context?: LogContext) =>
    write("error", msg, { ...(error !== undefined ? toErrorContext(error) : {}), ...context }),
};
