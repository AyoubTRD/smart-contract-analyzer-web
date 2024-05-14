import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import rollup from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [react(), rollup()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
