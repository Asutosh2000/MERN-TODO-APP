import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Connection Error", err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => console.log("MONGODB Error", error));
