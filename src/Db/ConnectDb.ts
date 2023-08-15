import mongoose from "mongoose";
import { Logger } from "../Utils/Logger";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    Logger.info("Db connected");
  } catch (error) {
    Logger.error("Failed to connect db " + error);
  }

  mongoose.connection.on("error", (err) => {
    Logger.error("Db connection failed " + err);
  });

  mongoose.connection.on("disconnected", () => {
    Logger.info("Db disconnected");
  });
};

export default connectDb;
