import { subscribeToReport } from "./actions/subscribe-to-report";
import config from "./config.json";
import { startHttpServer } from "./transport/http-server";
import { startRedisClient } from "./transport/redis-client";
import { createWSServer, listenToWSConnection } from "./transport/ws-server";

startRedisClient();

const wsServer = createWSServer({
  host: config.webSocketServerHost,
  port: config.webSocketServerPort,
});
listenToWSConnection(wsServer, subscribeToReport);

startHttpServer({ host: config.httpServerHost, port: config.httpServerPort });
