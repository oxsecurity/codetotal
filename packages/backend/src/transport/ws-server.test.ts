import { WebSocketServer } from "ws";
import { createWSServer, listenToWSConnection } from "./ws-server";

// mock WS to avoid openning a real mock server
// during unit tests
jest.mock("ws", () => ({
  WebSocketServer: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

const mock = { on: jest.fn() };

describe("ws-server", () => {
  test("createWSServer", () => {
    const server = createWSServer({ host: "localhost", port: 8081 });
    expect(server).toBeDefined();
    expect(typeof server.on).toBe("function");
  });

  test("listenToWSConnection", () => {
    const callback = jest.fn();
    listenToWSConnection(mock as unknown as WebSocketServer, callback);
    expect(mock.on).toBeCalledWith("connection", callback);
  });
});
