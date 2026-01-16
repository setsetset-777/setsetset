import type { UserConfig } from "vite";
import path from "path";

export default {
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/js/main.js"),
        reset: path.resolve(__dirname, "src/styles/reset.scss"),
      },
    },
  },
} satisfies UserConfig;
