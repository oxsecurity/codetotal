import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "node:path";
import { logger } from "../utils/logger";

export const createHttpServer = () => {
  const app = express();

  // enable cors
  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // serve static files from "public" under "dist"
  const staticFolderPath = path.resolve(".", "dist", "public");
  logger.transport.log(`Setting static folder to: "${staticFolderPath}"`);
  app.use(express.static(staticFolderPath));

  return app;
};
