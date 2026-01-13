import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.SERVER_PORT || 3000;

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}/`);
});
