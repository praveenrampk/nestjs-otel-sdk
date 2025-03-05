import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";

import { OTEL } from "../constants";

const logExporter = new OTLPLogExporter({
  url: process.env.OTEL_LOG_EXPORTER_URL ?? OTEL.EXPORTER_URLS.LOG,
});

export default logExporter;
