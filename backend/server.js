import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Configure according to frontend later if needed
app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);

import { MongoMemoryServer } from 'mongodb-memory-server';

// Connect to MongoDB
const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    
    // If no URI is provided, use an in-memory database so the app works out-of-the-box
    if (!uri) {
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log("No MONGODB_URI provided. Starting in-memory MongoDB...");
    }

    await mongoose.connect(uri);
    console.log(`Connected to MongoDB`);
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

connectDB();
