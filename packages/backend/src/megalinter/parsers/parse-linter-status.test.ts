import { LinterStatus } from "shared-types";
import { LinterCompleteMessage } from "../megalinter-types";
import { parseLinterStatus } from "./parse-linter-status";

const storeMock = {
  set: jest.fn(),
  get: jest.fn().mockImplementation(() => ({ linters: [{ name: "devskim" }] })),
  subscribe: jest.fn(),
};

describe("parse-linter-status", () => {
  test("createWSServer", () => {
    const linterCompleteMessage = {
      linterStatus: LinterStatus.Success,
      linterId: "devskim",
    };
    parseLinterStatus(
      linterCompleteMessage as LinterCompleteMessage,
      storeMock
    );
    expect(storeMock.set).toBeCalledWith({
      linters: [{ name: "devskim", status: LinterStatus.Success }],
    });
  });
});
