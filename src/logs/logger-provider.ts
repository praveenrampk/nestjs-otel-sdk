import { LoggerProvider } from "@opentelemetry/sdk-logs";

import resource from "../otel/resource";

const loggerProvider = new LoggerProvider({ resource });

export default loggerProvider;
