import { ReportState } from "shared-types";
import config from "./config";

export const subscribe = (
  requestId: string,
  onMessage: (data: ReportState) => void,
  onError: () => void,
  onClose: () => void
) => {
  const ws = new WebSocket(
    `ws://${config.CODETOTAL_WS_HOST}:${config.CODETOTAL_WS_PORT}?requestId=${requestId}`
  );
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
  ws.onerror = onError;
  ws.onclose = onClose;

  const unsubscribe = () => {
    if (ws.readyState === ws.OPEN) {
      ws.close();
    }
  };
  return unsubscribe;
};
