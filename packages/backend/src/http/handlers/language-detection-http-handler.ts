import { Request, Response } from "express";
import { detectLanguage } from "../../language-detection/language-detect";
import { logger } from "../../utils/logger";

export const languageDetectionHttpHandler = async (
  req: Request,
  res: Response
) => {
  const { snippet } = req.body;

  try {
    const language = await detectLanguage(snippet);
    language && res.json(language);
  } catch (err) {
    logger.transport.error(err.message);
    res.status(500).send();
  }

  res.status(200).send();
};
