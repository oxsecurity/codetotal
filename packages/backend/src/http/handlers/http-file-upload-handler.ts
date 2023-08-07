import { RequestHandler } from "express";
import multer from "multer";

export const createFileUploadHandler = (uploader: FileUploader): RequestHandler => {
  const storage = uploader.memoryStorage();
  const upload = uploader({ storage });
  return upload.single("file");
};

export const multerFileUploadHandler = createFileUploadHandler(multer as FileUploader);

export type FileUploader = {
  memoryStorage(): object;
  (options: { storage: object });
};
