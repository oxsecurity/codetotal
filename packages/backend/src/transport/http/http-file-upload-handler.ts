import { RequestHandler } from "express";

export const createFileUploadHandler = (uploader: FileUploader): RequestHandler => {
  const storage = uploader.memoryStorage();
  const upload = uploader({ storage });
  return upload.single("file");
};

export type FileUploader = {
  memoryStorage(): object;
  (options: { storage: object });
};
