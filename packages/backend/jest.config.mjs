import dotenv from "dotenv";

// load ENV variables from .env file
dotenv.config({ path: "../../.env" });

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["node_modules", "dist"],
};
