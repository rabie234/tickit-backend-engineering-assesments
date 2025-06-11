import mongoose from "mongoose";
import type { AppConfig } from "./app.config";

export const connectToDatabase = async (config: AppConfig) => {
  const database: string = config.mongo.databaseURL;
  const options: mongoose.ConnectOptions = config.mongo.options;

  await mongoose.connect(database, options);
  console.log("MongoDB connected");
};

export default connectToDatabase;
