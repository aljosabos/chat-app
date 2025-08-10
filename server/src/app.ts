import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use((req, res, next) => {
  Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
  });
  next();
});

//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//helmet
app.use(helmet());

//parse JSON request body
app.use(express.json());

//parse URL-encoded data (npr. iz HTML formi)
app.use(express.urlencoded({ extended: true }));

//sanitize request data
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(fileUpload({ useTempFiles: true }));

app.post("/api/test", (req, res) => {
  res.json({ res: req.body });
});

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
