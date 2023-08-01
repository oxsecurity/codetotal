import config from "../../config";

const port = config.CODETOTAL_HTTP_PORT;
const host = config.CODETOTAL_HTTP_HOST;
const prefix = "api";

export const backendUrl =
  port === "80" || port === undefined
    ? `//${host}/${prefix}`
    : `//${host}:${port}/${prefix}`;
  