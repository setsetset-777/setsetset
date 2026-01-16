import express from "express";
import path from "path";
import { fileURLToPath } from "url";

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

app.get("/", async (req, res) => {
  const { mainJs, mainCss, resetCss } = getAssetsDetails(clientDistPath);

  const home = await fetchGlobal("home");

  res.render("home", {
    home: {
      catch: home.catch,
    },
    mainJs,
    mainCss,
    resetCss,
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}/`);
});
