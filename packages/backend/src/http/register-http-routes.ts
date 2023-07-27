import express from "express";
import { analysisHttpHandler } from "./handlers/analysis-http-handler";
import { multerFileUploadHandler } from "./handlers/http-file-upload-handler";
import { languageDetectionHttpHandler } from "./handlers/language-detection-http-handler";
import { reportHttpHandler } from "./handlers/report-http-handler";

export const registerRoutes = (app: express.Express) => {
  app.post("/analysis", multerFileUploadHandler, analysisHttpHandler);
  app.get("/report/:requestId", reportHttpHandler);
  app.post("/detect", languageDetectionHttpHandler);
};
