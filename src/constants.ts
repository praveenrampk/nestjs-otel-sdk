export const OTEL = {
  LOGGER: "otel-logger",
  SERVICE: {
    NAME: "nestjs-app",
    VERSION: "2.0.0",
  },
  EXPORTER_URLS: {
    TRACE: "http://localhost:4318/v1/traces",
    LOG: "http://localhost:4318/v1/logs",
  },
} as const;

export enum LogLevel {
  LOG = "log",
  ERROR = "error",
  WARN = "warn",
  DEBUG = "debug",
  VERBOSE = "verbose",
}
