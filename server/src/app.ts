import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get("/api", (req, res) => {
  res.send("Root api test");
});

app.use(express.static(join(__dirname, "../../client/dist")));

export default app;
