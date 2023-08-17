import { Response } from "express";

export const staticFilesHttpHandler =
  (indexHtml: string) => (_: unknown, res: Response) => {
    res.send(indexHtml);
  };
