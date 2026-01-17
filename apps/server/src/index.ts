import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";

interface HttpError extends Error {
  status?: number;
}

console.log("NODE_ENV", process.env.NODE_ENV);

import { fetchGlobal, getAssetsDetails } from "./utils/index.ts";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = parseInt(process.env.SERVER_PORT as string) || 3000;

const clientDistPath = process.env.CLIENT_DIST || "../../client/dist";
const clientAssetsPath = path.join(clientDistPath, "assets");

app.use(express.static(path.join(__dirname, "../public")));

app.use("/assets", express.static(clientAssetsPath));

app.set("view engine", "ejs");

app.set("views", __dirname + "/views");

app.get("/", async (req, res, next) => {
  const { mainJs, mainCss, resetCss } = getAssetsDetails(clientDistPath);

  try {
    const home = await fetchGlobal("home");

    res.render("home", {
      home: {
        catch: home.catch,
      },
      mainJs,
      mainCss,
      resetCss,
    });
  } catch (e) {
    next(e);
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const { mainJs, mainCss, resetCss } = getAssetsDetails(clientDistPath);

  res.status(err.status || 500);
  console.log(process.env.NODE_ENV);
  res.render("error", {
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong. Please try agaon later."
        : err.message,
    mainJs,
    mainCss,
    resetCss,
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}/`);
});
