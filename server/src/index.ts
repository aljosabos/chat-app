import { logger } from "#configs/logger.js";
import app from "./app.js";

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => {
  logger.info(`App is listening on port ${PORT.toString()}....`);
});
