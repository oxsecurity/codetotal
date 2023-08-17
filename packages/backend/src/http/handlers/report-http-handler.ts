import { AnalysisStatus } from "@ct/shared-types";
import { Request, Response } from "express";
import { getStore } from "../../stores/stores-map";

export const reportHttpHandler = (req: Request, res: Response) => {
  const { requestId } = req.params;

  // Resolve store
  const reportStore = getStore(requestId);

  if (reportStore) {
    res.json({ ...reportStore.get() });
  } else {
    res.json({ status: AnalysisStatus.NotFound });
  }
};
