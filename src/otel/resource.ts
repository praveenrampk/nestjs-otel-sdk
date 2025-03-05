import { Resource } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

import { OTEL } from "@src/constants";

const resource = Resource.default().merge(
  new Resource({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? OTEL.SERVICE.NAME,
    [ATTR_SERVICE_VERSION]:
      process.env.OTEL_SERVICE_VERSION ?? OTEL.SERVICE.VERSION,
  })
);

export default resource;
