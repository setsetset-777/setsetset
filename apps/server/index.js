import express from "express";

const app = express();

const port = process.env.SERVER_PORT || 3000;

app.get("/", (req, res) => {
  res.send("777 setsetset");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}/`);
});
