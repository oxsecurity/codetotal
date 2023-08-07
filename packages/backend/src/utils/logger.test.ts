import { logger } from "./logger";

describe("logger", () => {
  let originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    jest.resetAllMocks();
  });

  test("log", () => {
    logger.actions.log("123");
    expect(console.log).toBeCalledWith("[actions] 123");
  });

  test("error", () => {
    logger.stores.error("123");
    expect(console.error).toBeCalledWith("[stores] 123");
  });
});
