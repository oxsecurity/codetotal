import { subscribeToReport } from "./actions/subscribe-to-report";
import config from "./config";
import { startHttpServer } from "./transport/http/http-server";
import { startRedisClient } from "./transport/redis-client";
import { createWSServer, listenToWSConnection } from "./transport/ws-server";

startRedisClient();

const wsServer = createWSServer({
  host: config.CODETOTAL_WS_HOST,
  port: config.CODETOTAL_WS_PORT,
});

listenToWSConnection(wsServer, subscribeToReport);

startHttpServer({
  host: config.CODETOTAL_HTTP_HOST,
  port: config.CODETOTAL_HTTP_PORT,
});
