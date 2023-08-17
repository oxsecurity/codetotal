import express from "express";
import fs from "node:fs";
import path from "node:path";
import { logger } from "../utils/logger";
import { allLanguagesHttpHandler } from "./handlers/all-languages-http-handler";
import { analysisHttpHandler } from "./handlers/analysis-http-handler";
import { multerFileUploadHandler } from "./handlers/http-file-upload-handler";
import { languageDetectionHttpHandler } from "./handlers/language-detection-http-handler";
import { reportHttpHandler } from "./handlers/report-http-handler";
import { staticFilesHttpHandler } from "./handlers/static-files-http-handler";

export const registerRoutes = (app: express.Express) => {
  const prefix = "/api";

  app.post(`${prefix}/analysis`, multerFileUploadHandler, analysisHttpHandler);
  app.get(`${prefix}/report/:requestId`, reportHttpHandler);
  app.post(`${prefix}/detect`, languageDetectionHttpHandler);
  app.get(`${prefix}/all-languages`, allLanguagesHttpHandler);

  if (process.env.NODE_ENV === "production") {
    const indexHTMLPath = path.resolve("./dist", "public", "index.html");
    const indexHTML = fs.readFileSync(indexHTMLPath).toString();
    logger.transport.log(
      "Serving the following index.html file for all GET requests"
    );
    logger.transport.log(indexHTML);

    app.get("*", staticFilesHttpHandler);
  }
};
