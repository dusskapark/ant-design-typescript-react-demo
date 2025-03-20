import react from "@vitejs/plugin-react";
import * as path from "path";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
  ],
  css: {
      preprocessorOptions: {
          less: {
              javascriptEnabled: true,
              modifyVars: {
                // Ant Design 5 테마 변수 재정의
                'primary-color': '#725ac1ff',  // slate-blue 색상으로 기본 테마 변경
              },
          },
      },
  },
  define: { "process.env": process.env },

  optimizeDeps: {
      include: ["tailwind.config.js"],
  },
  resolve: {
      alias: {
          "@": resolve(__dirname, "./src"),
          "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
      },
  },
});