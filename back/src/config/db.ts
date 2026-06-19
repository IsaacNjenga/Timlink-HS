import dotenv from "dotenv";
import mongoose from "mongoose";
import { env } from "./env";

dotenv.config();

const uri = env.URI || "";

export async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed!:", error);
    process.exit(1); // crash early (important)
  }
}