import path from "path";
import fs from "fs";

export * from "./fetchPayload.ts";

/**
 * Returns client assets access details
 */
export const getAssetsDetails = (
  clientDistPath: string,
): {
  mainJs: string;
  mainCss: string;
  resetCss: string;
} => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(clientDistPath, ".vite/manifest.json"), "utf-8"),
  );

  const main = manifest["src/js/main.js"];
  const reset = manifest["src/styles/reset.scss"];

  return {
    mainJs: main.file,
    mainCss: main.css[0],
    resetCss: reset.file,
  };
};
