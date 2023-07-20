/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "react-app/jest",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "tss-unused-classes"],
  rules: {
    "tss-unused-classes/unused-classes": "warn",
  },
  root: true,
};
