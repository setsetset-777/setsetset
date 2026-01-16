import path from "path";
import fs from "fs";

export * from "./fetchPayload.ts";

const manifestFile = process.env.MANIFEST_FILE as string;
const mainFile = process.env.MAIN_FILE as string;
const resetFile = process.env.RESET_FILE as string;

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
    fs.readFileSync(path.join(clientDistPath, manifestFile), "utf-8"),
  );

  const main = manifest[mainFile];
  const reset = manifest[resetFile];

  return {
    mainJs: main.file,
    mainCss: main.css[0],
    resetCss: reset.file,
  };
};
