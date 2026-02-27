import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@Assets": path.resolve(__dirname, "src/assets"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Page": path.resolve(__dirname, "src/pages"),
      "@Utlis": path.resolve(__dirname, "src/utils"),
    },
  },
});
