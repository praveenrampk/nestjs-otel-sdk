import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

import resource from "../otel/resource";
import logExporter from "../logs/log-exporter";
import traceExporter from "../traces/trace-exporter";
import loggerProvider from "../logs/logger-provider";

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
