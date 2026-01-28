import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

import {
  fetchGlobal,
  getAssetsDetails,
  clientDistPath,
  fetchPayload,
  fetchPage,
} from "../utils/index.ts";
import type { HttpError } from "../types/index.ts";

const router = Router();

const localization = await fetchPayload("locales");

const { localeCodes: locales, defaultLocale } = localization;

const { mainJs, mainCss, resetCss } = getAssetsDetails(clientDistPath);
const viewData = {
  mainJs,
  mainCss,
  resetCss,
  analytics: {
    enable: process.env.ANALYTICS_ENABLE === "true",
    domain: process.env.ANALYTICS_DOMAIN,
    id: process.env.ANALYTICS_ID,
  },
};

router.get("{/*paths}", async (req, res, next) => {
  const paths = req.params.paths || [];
  let locale = defaultLocale;
  let path;

  if (locales.includes(paths[0])) {
    locale = paths[0];
    path = paths[1];
  } else {
    path = paths[0];
  }

  if (!path) {
    path = "home";
  }

  try {
    await fetchPage(path, locale);
  } catch (e) {
    const err = new Error("Page not found");
    (err as any).status = 404;
    throw err;
  }

  try {
    const home = await fetchGlobal("home", locale);

    res.render("home", {
      home: {
        catch: home.catch,
      },
      ...viewData,
    });
  } catch (e) {
    next(e);
  }
});

/**
 * ERROR HANDLING
 */
router.use(
  (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);

    res.render("error", {
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong. Please try agaon later."
          : err.message,
      ...viewData,
    });
  },
);

export default router;
