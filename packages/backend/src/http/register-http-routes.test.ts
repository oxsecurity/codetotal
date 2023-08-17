import express from "express";

// imports (module) mocks
const multerFileUploadHandlerMock = jest.fn();
jest.mock("./handlers/http-file-upload-handler", () => ({
  multerFileUploadHandler: multerFileUploadHandlerMock,
}));

const analysisHttpHandlerMock = jest.fn();
jest.mock("./handlers/analysis-http-handler", () => ({
  analysisHttpHandler: analysisHttpHandlerMock,
}));

const reportHttpHandlerMock = jest.fn();
jest.mock("./handlers/report-http-handler", () => ({
  reportHttpHandler: reportHttpHandlerMock,
}));

const languageDetectionHttpHandlerMock = jest.fn();
jest.mock("./handlers/language-detection-http-handler", () => ({
  languageDetectionHttpHandler: languageDetectionHttpHandlerMock,
}));

const allLanguagesHttpHandlerMock = jest.fn();
jest.mock("./handlers/all-languages-http-handler", () => ({
  allLanguagesHttpHandler: allLanguagesHttpHandlerMock,
}));

const pathResolveMock = jest.fn(() => "/some-path");
jest.mock("node:path", () => ({
  resolve: pathResolveMock,
}));

const fsReadFileMock = jest.fn(() => "HTML Content");
jest.mock("node:fs", () => ({
  readFileSync: fsReadFileMock,
}));

const logMockFunction = jest.fn();
jest.mock("../utils/logger", () => ({
  logger: {
    transport: {
      log: logMockFunction,
    },
  },
}));

const staticFilesHttpHandlerMock = jest.fn();
jest.mock("./handlers/static-files-http-handler", () => ({
  staticFilesHttpHandler: staticFilesHttpHandlerMock,
}));

// Why this import isn't at the top?
// https://stackoverflow.com/a/67114668/17566189
import { registerRoutes } from "./register-http-routes";

const expressAppMock = {
  post: jest.fn(),
  get: jest.fn(),
};

describe("register-http-routes", () => {
  test("registerRoutes", () => {
    process.env.NODE_ENV = "production";
    registerRoutes(expressAppMock as unknown as express.Express);

    const prefix = "/api";

    // /analysis route
    expect(expressAppMock.post).toBeCalledWith(
      `${prefix}/analysis`,
      multerFileUploadHandlerMock,
      analysisHttpHandlerMock
    );

    // /report/:requestId route
    expect(expressAppMock.get).toBeCalledWith(
      `${prefix}/report/:requestId`,
      reportHttpHandlerMock
    );

    // /detect route
    expect(expressAppMock.post).toBeCalledWith(
      `${prefix}/detect`,
      languageDetectionHttpHandlerMock
    );

    // /all-languages route
    expect(expressAppMock.get).toBeCalledWith(
      `${prefix}/all-languages`,
      allLanguagesHttpHandlerMock
    );
    expect(pathResolveMock).toBeCalledWith("./dist", "public", "index.html");
    expect(fsReadFileMock).toBeCalledWith("/some-path");
    expect(logMockFunction).toBeCalledWith(
      "Serving the following index.html file for all GET requests"
    );
    expect(logMockFunction).toBeCalledWith("HTML Content");

    // static files route
    expect(expressAppMock.get).toBeCalledWith("*", staticFilesHttpHandlerMock);
  });
});
