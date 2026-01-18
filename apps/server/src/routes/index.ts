import express from "express";
import type { Request, Response, NextFunction } from "express";

import {
  fetchGlobal,
  getAssetsDetails,
  clientDistPath,
} from "../utils/index.ts";
import type { HttpError } from "../types/index.ts";

const router = express.Router();

router.get("/", async (req, res, next) => {
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

router.use((req, res) => {
  res.status(404).render("404");
});

router.use(
  (err: HttpError, req: Request, res: Response, next: NextFunction) => {
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
  },
);

export default router;
