import { WebSocketServer } from "ws";
import { logger } from "../utils/logger";

export const createWSServer = (options: CreateServerOptions) => {
  logger.transport.log(
    `WebSocket server running on ${options.host}:${options.port}`
  );
  return new WebSocketServer(options);
};

export const listenToWSConnection = (
  wss: WebSocketServer,
  callback: Callback
) => {
  wss.on("connection", callback);
};

export type Callback = (
  ws: { send: (message: string) => void },
  request: WSRequest
) => void;

export interface CreateServerOptions {
  host: string;
  port: number;
}

export type WSRequest = { url: string; headers: { host: string } };
