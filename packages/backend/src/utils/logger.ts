import process from "node:process";
import { debugModules } from "../config.json";

const createLogger = (moduleName: string) => {
  return {
    log(...args: string[]) {
      if (debugModules.includes(moduleName)) {
        process.env.NODE_ENV !== "test" &&
          console.log(`[${moduleName}] ${args.join("\n")}`);
      }
    },
    error(...args: string[]) {
      if (debugModules.includes(moduleName)) {
        process.env.NODE_ENV !== "test" &&
          console.error(`[${moduleName}] ${args.join("\n")}`);
      }
    },
  };
};

export const logger = {
  actions: createLogger("actions"),
  megalinter: createLogger("megalinter"),
  stores: createLogger("stores"),
  transport: createLogger("transport"),
};
