import dotenv from "dotenv";

// load ENV variables from .env file
dotenv.config({ path: "./.env" });

// For VSCode support using the "Jest" extension by "Orta"
// (same goes for the root tsconfig.json file)
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["node_modules", "dist"],
};
