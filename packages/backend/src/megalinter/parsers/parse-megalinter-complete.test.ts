import { AnalysisStatus } from "@ct/shared-types";
import { MegalinterCompleteMessage } from "../megalinter-types";
import { parseMegalinterComplete } from "./parse-megalinter-complete";

const storeMock = {
  set: jest.fn(),
  get: jest.fn().mockImplementation(() => ({ linters: [{ name: "devskim" }] })),
  subscribe: jest.fn(),
};

describe("parse-megalinter-complete", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("set status to completed", () => {
    const megalinterCompleteMessage = {
      megaLinterStatus: AnalysisStatus.Completed,
    };
    parseMegalinterComplete(
      megalinterCompleteMessage as MegalinterCompleteMessage,
      storeMock
    );
    expect(storeMock.set).toBeCalledWith({
      status: AnalysisStatus.Completed,
    });
  });

  test("set status to created", () => {
    const megalinterCompleteMessage = {
      megaLinterStatus: AnalysisStatus.Created,
    };
    parseMegalinterComplete(
      megalinterCompleteMessage as MegalinterCompleteMessage,
      storeMock
    );
    expect(storeMock.set).toBeCalledWith({
      status: AnalysisStatus.Created,
    });
  });

  test("should not set an unknown status", () => {
    const megalinterCompleteMessage = {
      megaLinterStatus: "someUnknownStatus",
    };
    parseMegalinterComplete(
      megalinterCompleteMessage as MegalinterCompleteMessage,
      storeMock
    );
    expect(storeMock.set).not.toBeCalled();
  });
});
