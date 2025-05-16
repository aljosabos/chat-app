import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get("/api/fruits", (req, res) => {
  const fruits = ["apple", "bannana", "avocado", "kiwi", "orange"];

  const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  res.cookie("test_cookie", "some_value", {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
  res.json({ fruits });
});

app.use(express.static(join(__dirname, "../../client/dist")));

export default app;
