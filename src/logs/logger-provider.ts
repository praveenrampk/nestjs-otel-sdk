import { LoggerProvider } from "@opentelemetry/sdk-logs";

import resource from "@src/otel/resource";

const loggerProvider = new LoggerProvider({ resource });

export default loggerProvider;
