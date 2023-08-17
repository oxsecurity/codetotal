import express from "express";

const logMockFunction = jest.fn();
jest.mock("../utils/logger", () => ({
  logger: {
    transport: {
      log: logMockFunction,
    },
  },
}));

// Why this import isn't at the top?
// https://stackoverflow.com/a/67114668/17566189
import { startHttpServer } from "./start-http-server";

const serverMock = {
  listen: jest.fn((_, __, callback) => {
    callback();
  }),
};

describe("start-http-server", () => {
  test("startHttpServer", () => {
    const port = 8080;
    const host = "localhost";
    startHttpServer({
      httpServer: serverMock as unknown as express.Express,
      host,
      port,
    });

    expect(serverMock.listen).toBeCalledWith(port, host, expect.any(Function));
    expect(logMockFunction).toBeCalledWith(
      `HTTP server is running on ${host}:${port}`
    );
  });
});
