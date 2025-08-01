import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT.toString()}....`);
});
