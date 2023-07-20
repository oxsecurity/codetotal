import react from "@vitejs/plugin-react";
import { PluginOption, defineConfig } from "vite";
import checker from "vite-plugin-checker";

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
    esbuild: {
      // needed for keepNames
      minifyIdentifiers: false,
      // keep components' names as is (for React's dev-tool to work properly)
      keepNames: true,
    },
    plugins,
  };
});
