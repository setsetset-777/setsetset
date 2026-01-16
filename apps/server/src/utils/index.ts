import path from "path";
import fs from "fs";

import config from "./config.ts";
export * from "./fetchPayload.ts";

<<<<<<< Updated upstream
const manifestFile = process.env.MANIFEST_FILE as string;
const mainFile = process.env.MAIN_FILE as string;
const resetFile = process.env.RESET_FILE as string;

=======
<<<<<<< Updated upstream
=======
const { manifestFile, mainFile, resetFile } = config.client;

>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
