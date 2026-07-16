import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Connects to MongoDB. If it fails, we stop the server -
// there is no point running an API that cannot save anything.
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: DB_NAME,
    });
    console.log(`MongoDB connected! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
