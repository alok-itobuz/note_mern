import mongoose from "mongoose";
import { MONGODB_URL } from "../config/config.js";

const connectDB = () => {
  mongoose.connect(`${MONGODB_URL}/notes`);

  mongoose.connection.once("open", () => {
    console.log("Connected to db successfully.");
  });

  mongoose.connection.on("error", () => {
    console.log("Error connecting to db.");
    mongoose.disconnect();
  });
};

export default connectDB;
