import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";
import postRoutes from "./routes/posts.js";
import imageProxyRoutes from "./routes/imageProxy.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postRoutes);
//app.use("/image", imageProxyRoutes);
app.use("/", imageProxyRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
