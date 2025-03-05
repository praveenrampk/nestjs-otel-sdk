import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

import { OTEL } from "@src/constants";

const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_TRACE_EXPORTER_URL ?? OTEL.EXPORTER_URLS.TRACE,
});

export default traceExporter;
