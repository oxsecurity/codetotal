import { MegalinterErrorMessage, MessageType } from "../megalinter-types";
import { parseMegalinterError } from "./parse-errors";

const storeMock = {
  set: jest.fn(),
  get: jest.fn().mockImplementation(() => ({ linters: [{ name: "devskim" }] })),
  subscribe: jest.fn(),
};

describe("parse-errors", () => {
  test("parseMegalinterError", () => {
    const linterErrorMessage = {
      messageType: MessageType.ServerError,
      message: "Some error message",
      errorCode: "gitCloneError",
      errorDetails: {
        error: "Some error details",
      },
      requestId: "123",
    };
    parseMegalinterError(
      linterErrorMessage as MegalinterErrorMessage,
      storeMock
    );

    expect(storeMock.set).toBeCalledWith({
      analysisError: {
        errorCode: "gitCloneError",
        errorMessage: "Some error message",
        errorDetails: "Some error details",
      },
    });
  });

  test("parseMegalinterError should fail gracefully", () => {
    const linterErrorMessage = {};

    try {
      parseMegalinterError(
        linterErrorMessage as MegalinterErrorMessage,
        storeMock
      );
    } catch (err) {
      expect(err.message).toBe("Unable to parse megalinter error message");
    }
  });
});
