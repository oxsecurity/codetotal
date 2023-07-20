import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import multer from "multer";
import path from "node:path";
import { Analysis, AnalysisStatus, FileAnalysis } from "shared-types";
import { createAnalysis } from "../actions/create-analysis";
import { getStore } from "../stores/stores-map";
import { logger } from "../utils/logger";

export const startHttpServer = ({ host, port }: HttpServerOptions) => {
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

  // add analysis route
  app.post(
    "/analysis",
    createFileUploadHandler(),
    async (req: Request, res: Response) => {
      logger.transport.log("Receiver new analysis request");
      const file = req.file;
      let action = req.body as Analysis;
      if (file) {
        action = { ...action, file } as FileAnalysis;
      }

      try {
        const result = await createAnalysis(action);
        res.json(result);
      } catch (err) {
        logger.transport.error(err.message);
        res.status(500).send();
      }
    }
  );

  app.get("/report/:requestId", (req: Request, res: Response) => {
    const { requestId } = req.params;

    // Resolve store
    const reportStore = getStore(requestId);

    if (reportStore) {
      res.json({ ...reportStore.get() });
    } else {
      res.json({ status: AnalysisStatus.NotFound });
    }
  });

  app.listen(port, host, () => {
    logger.transport.log(`HTTP server is running on ${host}:${port}`);
  });
};

interface HttpServerOptions {
  host: string;
  port: number;
}

const createFileUploadHandler = () => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  return upload.single("file");
};
