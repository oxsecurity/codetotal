import { AnalysisStatus } from "@ct/shared-types";
import { MegalinterCompleteMessage } from "../megalinter-types";
import { parseMegalinterComplete } from "./parse-megalinter-complete";

const reportStoreMock = {
  get: jest.fn(),
  set: jest.fn(),
  subscribe: jest.fn(),
};

describe("parse-megalinter-complete", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("set status to completed", () => {
    reportStoreMock.get.mockImplementation(() => ({
      status: AnalysisStatus.Completed,
    }));

    const megalinterCompleteMessage = {
      megaLinterStatus: AnalysisStatus.Completed,
    };

    parseMegalinterComplete(
      megalinterCompleteMessage as MegalinterCompleteMessage,
      reportStoreMock
    );

    expect(reportStoreMock.set).toBeCalledWith({
      status: AnalysisStatus.Completed,
    });
  });

  test("waiting for fetchingSBOMPackages to complete", () => {
    reportStoreMock.get.mockImplementation(() => ({
      fetchingSBOMPackages: true,
    }));
    reportStoreMock.subscribe.mockImplementation((callback) => {
      callback({ fetchingSBOMPackages: false });
    });

    const megalinterCompleteMessage = {
      megaLinterStatus: AnalysisStatus.Completed,
    };

    parseMegalinterComplete(
      megalinterCompleteMessage as MegalinterCompleteMessage,
      reportStoreMock
    );

    expect(reportStoreMock.subscribe).toBeCalled();
    expect(reportStoreMock.set).toBeCalledWith({
      status: AnalysisStatus.Completed,
    });
  });

  test("set status to created", () => {
    const megalinterCompleteMessage = {
      megaLinterStatus: AnalysisStatus.Created,
    };

    parseMegalinterComplete(
      megalinterCompleteMessage as MegalinterCompleteMessage,
      reportStoreMock
    );

    expect(reportStoreMock.set).toBeCalledWith({
      status: AnalysisStatus.Created,
    });
  });

  test("should not set an unknown status", () => {
    const megalinterCompleteMessage = {
      megaLinterStatus: "someUnknownStatus",
    };

    parseMegalinterComplete(
      megalinterCompleteMessage as MegalinterCompleteMessage,
      reportStoreMock
    );

    expect(reportStoreMock.set).not.toBeCalled();
  });
});
