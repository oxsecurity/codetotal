import bodyParser from "body-parser";
import cors from "cors";
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
const staticFuncMock = jest.fn();
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
  });
});
