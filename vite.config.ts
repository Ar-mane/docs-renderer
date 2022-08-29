import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: [{ find: "@lib", replacement: resolve(__dirname, "src/lib") }],
  },

  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    commonjs(),
    react({
      jsxRuntime: "classic",
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "docs-renderer",
      formats: ["es", "umd"],
      fileName: (format) => `docs-renderer.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    },
  },
});
