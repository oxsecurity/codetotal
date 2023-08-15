import bodyParser from "body-parser";
import cors from "cors";
import express, { RequestHandler } from "express";
import monitor from "express-status-monitor";
import path from "node:path";
import { logger } from "../utils/logger";

export const createHttpServer = (factory: ServerFactory) => {
  const app = factory();

  // enable status monitoring
  app.use(monitor());

  // enable cors
  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // serve static files from "public" under "dist"
  const staticFolderPath = path.resolve(".", "dist", "public");
  logger.transport.log(`Setting static folder to: "${staticFolderPath}"`);
  app.use(factory.static(staticFolderPath));

  return app;
};

export type ServerFactory = {
  (): express.Express;
  static(path: string): RequestHandler;
};
