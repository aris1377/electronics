import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongDB connection succeed");

    const PORT = process.env.PORT ?? 3003;
    //app ni listen qilamiz
    app.listen(PORT, () => {
      console.info(`The server is running successfully on port: ${PORT}`);
    });
  })
  .catch((err) => console.log("ERROR on connection MongDB", err));
