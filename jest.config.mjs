// For VSCode support using the "Jest" extension by "Orta"
// (same goes for the root tsconfig.json file)
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["node_modules", "dist"],
};
