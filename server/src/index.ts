import { logger } from "./configs/logger.js";
import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT ?? 8000;

//exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error("Mongodb connection error: " + err);
  //close the server
  process.exit(1);
});

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => logger.info("Connected to MongoDB"));

const server = app.listen(PORT, () => {
  logger.info(`App is listening on port ${PORT.toString()}....`);
  console.log("process id", process.pid);
});

// handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
