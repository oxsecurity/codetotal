import {
  FileUploader,
  createFileUploadHandler,
} from "./http-file-upload-handler";

const memStorageMock = jest.fn(() => ({}));
const singleFuncMock = jest.fn(() => jest.fn());
const uploader = jest.fn(() => ({ single: singleFuncMock }));
uploader["memoryStorage"] = memStorageMock;

describe("http-file-upload-handler", () => {
  test("createFileUploadHandler", () => {
    const handler = createFileUploadHandler(
      uploader as unknown as FileUploader
    );

    expect(memStorageMock).toBeCalled();
    expect(uploader).toBeCalledWith({ storage: {} });
    expect(singleFuncMock).toBeCalledWith("file");
    expect(typeof handler).toBe("function");
  });
});
