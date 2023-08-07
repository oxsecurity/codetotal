import express from "express";
import fs from "node:fs";
import path from "node:path";
import { analysisHttpHandler } from "./handlers/analysis-http-handler";
import { multerFileUploadHandler } from "./handlers/http-file-upload-handler";
import { languageDetectionHttpHandler } from "./handlers/language-detection-http-handler";
import { reportHttpHandler } from "./handlers/report-http-handler";

export const registerRoutes = (app: express.Express) => {
  const prefix = "/api";

  app.post(`${prefix}/analysis`, multerFileUploadHandler, analysisHttpHandler);
  app.get(`${prefix}/report/:requestId`, reportHttpHandler);
  app.post(`${prefix}/detect`, languageDetectionHttpHandler);

  if (process.env.NODE_ENV === "production") {
    const indexHTMLPath = path.resolve("./dist", "public", "index.html");
    const indexHTML = fs.readFileSync(indexHTMLPath).toString();
    console.log("Serving the following index.html file for all GET requests");
    console.log(indexHTML);

    app.get("*", (req, res) => {
      res.send(indexHTML);
    });
  }
};
