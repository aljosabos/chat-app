import express, { NextFunction, Request, Response } from "express";
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
import { Error } from "mongoose";
import createHttpError from "http-errors";
import routes from "./routes/index.js";
import { v2 as cloudinary } from "cloudinary";
interface HttpError extends Error {
  status?: number;
}

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

//routes
//http://localhost:8000/api/v1/auth/register
app.use("/api/v1", routes);

// Serving frontend build
app.use(express.static(join(__dirname, "../../client/dist")));

// SPA Fallback - sve ne-API rute vraćaju index.html
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(join(__dirname, "../../client/dist/index.html"));
  } else {
    next();
  }
});

// Not-found for API only
app.use((req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

//error handling
app.use(
  async (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err?.status ?? 500);
    res.send({
      error: {
        status: err.status ?? 500,
        message: err.message,
      },
    });
  }
);

export default app;
