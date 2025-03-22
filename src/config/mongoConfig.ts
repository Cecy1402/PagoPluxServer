import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Function to connect to the MongoDB database
const connectDB = async (): Promise<void> => {
  try {
    const mongoUri: string | undefined = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error("MONGO_URI is not defined. Check your .env file.");
      process.exit(1);
    }

    // Connect to MongoDB using the provided URI
    await mongoose.connect(mongoUri);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
