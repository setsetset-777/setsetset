import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import router from "./routes/index.ts";
import { clientAssetsPath } from "./utils/index.ts";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = parseInt(process.env.SERVER_PORT as string) || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.use("/assets", express.static(clientAssetsPath));

app.set("view engine", "ejs");

app.set("views", __dirname + "/views");

app.use(router);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}/`);
});
