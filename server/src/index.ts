import { logger } from "#configs/logger.js";
import app from "./app.js";

const PORT = process.env.PORT ?? 8000;

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
