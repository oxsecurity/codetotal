import bodyParser from "body-parser";
import cors from "cors";
import path from "node:path";
import { ServerFactory, createHttpServer } from "./create-http-server";

jest.mock("cors", () => jest.fn(() => jest.fn()));

jest.mock("body-parser", () => {
  const jsonFuncMock = jest.fn(() => jest.fn());
  const urlencodedFuncMock = jest.fn(() => jest.fn());
  return {
    urlencoded: urlencodedFuncMock,
    json: jsonFuncMock,
  };
});

const useFuncMock = jest.fn();
const serverFactoryMock = jest.fn(() => ({
  use: useFuncMock,
}));
const staticFileHandler = jest.fn();
const staticFuncMock = jest.fn(() => staticFileHandler);
serverFactoryMock["static"] = staticFuncMock;

describe("create-http-server", () => {
  test("createHttpServer", () => {
    const server = createHttpServer(
      serverFactoryMock as unknown as ServerFactory
    );
    expect(server).toBeDefined();
    expect(serverFactoryMock).toBeCalled();
    expect(useFuncMock).toBeCalled();
    expect(cors).toBeCalled();
    expect(bodyParser.urlencoded).toBeCalledWith({ extended: false });
    expect(staticFuncMock).toBeCalledWith(path.resolve(".", "dist", "public"));
    expect(useFuncMock).toBeCalledWith(staticFileHandler);
  });
});
