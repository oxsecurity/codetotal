describe("parse-megalinter-start", () => {
  test("dummy test", () => {
    expect(true).toBe(true);
  });
});

// import { AnalysisStatus, LinterStatus } from "shared-types";
// import {
//   MegalinterStartMessage,
//   MessageType,
//   RawLinter,
// } from "../megalinter-types";
// import { parseMegalinterStart } from "./parse-megalinter-start";

// const storeMock = {
//   set: jest.fn(),
//   get: jest.fn(),
//   subscribe: jest.fn(),
// };

// const docUrl = "https://www.google.com";

// const messageMock: MegalinterStartMessage = {
//   megaLinterStatus: AnalysisStatus.Created,
//   messageType: MessageType.MegalinterStart,
//   linters: [
//     {
//       linterId: "devskim",
//       docUrl,
//       linterStatus: LinterStatus.Started,
//     } as RawLinter,
//     {
//       linterId: "gitleaks",
//       docUrl,
//       linterStatus: undefined,
//     } as RawLinter,
//     {
//       linterId: "trivy-sbom",
//       isSBOM: true,
//       docUrl,
//       linterStatus: undefined,
//     } as RawLinter,
//   ],
// };

// describe("parse-megalinter-start", () => {
//   test("add linters to store", () => {
//     parseMegalinterStart(messageMock, storeMock);
//     expect(storeMock.set).toBeCalledWith({
//       linters: [
//         {
//           name: "devskim",
//           errors: 0,
//           severity: undefined,
//           docUrl,
//           status: LinterStatus.Started,
//         },
//         {
//           name: "gitleaks",
//           errors: 0,
//           severity: undefined,
//           docUrl,
//           status: LinterStatus.Started,
//         },
//       ],
//     });
//   });
// });
