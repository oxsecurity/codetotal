import WebSocket from "ws";
import { getStore } from "../stores/stores-map";
import { WSRequest } from "../transport/ws-server";
import { logger } from "../utils/logger";

export const subscribeToReport = (ws: WebSocket, request: WSRequest) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    const requestId = url.searchParams.get("requestId");
    if (!requestId) return;

    const reportStore = getStore(requestId);
    if (!reportStore) return;

    reportStore.subscribe((state) => {
      ws.send(JSON.stringify(state));
    });
  } catch (err) {
    logger.actions.error(
      `Unable to subscribe to reportStore (url: "${request.url}")`
    );
  }
};
