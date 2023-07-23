/* eslint-disable import/first */
import dotenv from "dotenv";

// load ENV variables from .env file
dotenv.config({ path: "../../.env" });

import react from "@vitejs/plugin-react";
import { PluginOption, defineConfig } from "vite";
import checker from "vite-plugin-checker";
import config from "./src/config";

export default defineConfig(({ command }) => {
  const plugins: PluginOption[] = [react()];

  // local development only plugins
  if (command === "serve") {
    // add Typescript type-checking
    plugins.push(
      checker({
        typescript: true,
      })
    );
  }

  return {
    mode: "production",
    server: {
      port: 3000,
    },
    build: {
      sourcemap: true,
      manifest: true,
      minify: true,
      rollupOptions: {
        treeshake: true,
        output: {
          manualChunks: {
            "react-dom": ["react-dom"],
            "@mui/material": ["@mui/material"],
          },
        },
      },
    },
    define: {
      "process.env": JSON.stringify({
        ...config,
      }),
    },
    esbuild: {
      // needed for keepNames
      minifyIdentifiers: false,
      // keep components' names as is (for React's dev-tool to work properly)
      keepNames: true,
    },
    plugins,
  };
});
