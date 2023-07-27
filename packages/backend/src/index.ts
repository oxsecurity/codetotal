import { subscribeToReport } from "./actions/subscribe-to-report";
import config from "./config";
import { createHttpServer } from "./http/create-http-server";
import { registerRoutes } from "./http/register-http-routes";
import { startHttpServer } from "./http/start-http-server";
import { startRedisClient } from "./transport/redis-client";
import { createWSServer, listenToWSConnection } from "./transport/ws-server";

startRedisClient();

const wsServer = createWSServer({
  host: config.CODETOTAL_WS_HOST,
  port: config.CODETOTAL_WS_PORT,
});
listenToWSConnection(wsServer, subscribeToReport);

const httpServer = createHttpServer();
registerRoutes(httpServer);
startHttpServer({
  httpServer,
  host: config.CODETOTAL_HTTP_HOST,
  port: config.CODETOTAL_HTTP_PORT,
});
