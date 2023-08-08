import { Request, Response } from "express";
import { allLanguages } from "../../language-detection/language-detect";
import { logger } from "../../utils/logger";

export const allLanguagesHttpHandler = async (_: Request, res: Response) => {
  try {
    res.json(allLanguages());
  } catch (err) {
    logger.transport.error(err.message);
    res.status(500).send();
  }
};
