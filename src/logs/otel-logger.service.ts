import { ConsoleLogger } from "@nestjs/common";
import { SeverityNumber } from "@opentelemetry/api-logs";

import { LogLevel, OTEL } from "../constants";
import loggerProvider from "../logs/logger-provider";

export class OtelLoggerService extends ConsoleLogger {
  private logMessage(
    methodName: LogLevel,
    severityNumber: SeverityNumber,
    ...args: any[]
  ) {
    if (methodName === LogLevel.ERROR) {
      const [message, stackOrContext, context] = args;
      super.error(message, stackOrContext, context);
    } else {
      super[methodName](args);
    }

    loggerProvider.getLogger(OTEL.LOGGER).emit({
      body: this.formatLog(args),
      severityNumber,
    });
  }

  formatLog(args: any) {
    return typeof args === "string" ? args : JSON.stringify(args);
  }

  log(...args: any[]) {
    this.logMessage(LogLevel.LOG, SeverityNumber.UNSPECIFIED, ...args);
  }

  error(...args: any[]) {
    this.logMessage(LogLevel.ERROR, SeverityNumber.ERROR, ...args);
  }

  warn(...args: any[]) {
    this.logMessage(LogLevel.WARN, SeverityNumber.WARN, ...args);
  }

  debug(...args: any[]) {
    this.logMessage(LogLevel.DEBUG, SeverityNumber.DEBUG, ...args);
  }

  verbose(...args: any[]) {
    this.logMessage(LogLevel.VERBOSE, SeverityNumber.TRACE, ...args);
  }
}
