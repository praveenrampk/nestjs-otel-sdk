import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

import resource from "@src/otel/resource";
import logExporter from "@src/logs/log-exporter";
import traceExporter from "@src/traces/trace-exporter";
import loggerProvider from "@src/logs/logger-provider";

export function bootstrapOTEL() {
  const instrumentations = [getNodeAutoInstrumentations()];

  const logRecordProcessor = new BatchLogRecordProcessor(logExporter);
  loggerProvider.addLogRecordProcessor(logRecordProcessor);

  const otelSDK = new NodeSDK({
    traceExporter,
    resource,
    instrumentations,
    logRecordProcessor,
  });

  process.on("SIGTERM", () => {
    otelSDK
      .shutdown()
      .then(() => console.log("OpenTelemetry terminated"))
      .catch((error) => console.error("Error terminating OpenTelemetry", error))
      .finally(() => process.exit(0));
  });

  otelSDK.start();
}
