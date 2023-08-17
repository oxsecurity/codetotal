import { Analysis, FileAnalysis } from "@ct/shared-types";
import { Request, Response } from "express";
import { createAnalysis } from "../../actions/create-analysis";
import { logger } from "../../utils/logger";

export const analysisHttpHandler = async (req: Request, res: Response) => {
  logger.transport.log("Received new analysis request");
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
};
