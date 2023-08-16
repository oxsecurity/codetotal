import process from "node:process";
import config from "../config";

const debugModules = config.DEBUG_MODULES.split(",");

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
  sbom: createLogger("sbom"),
};
