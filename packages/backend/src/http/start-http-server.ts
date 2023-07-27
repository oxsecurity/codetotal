import express from "express";
import { logger } from "../utils/logger";

export const startHttpServer = ({
  httpServer,
  host,
  port,
}: StartHttpServerOptions) => {
  httpServer.listen(port, host, () => {
    logger.transport.log(`HTTP server is running on ${host}:${port}`);
  });
};

interface StartHttpServerOptions {
  httpServer: express.Express;
  host: string;
  port: number;
}
