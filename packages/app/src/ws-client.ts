import { ReportState } from "shared-types";
import config from "./config.json";

export const subscribe = (
  requestId: string,
  onMessage: (data: ReportState) => void,
  onError: () => void,
  onClose: () => void
) => {
  const ws = new WebSocket(
    `ws://${config.websocketServerUrl}?requestId=${requestId}`
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
