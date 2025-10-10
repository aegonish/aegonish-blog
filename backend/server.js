import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import route modules
import uploadRoutes from "./routes/upload.js";
import postRoutes from "./routes/posts.js";
import imageProxyRoutes from "./routes/imageProxy.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postRoutes);
app.use("/image", imageProxyRoutes);

// ✅ Serve built frontend
const distPath = path.join(__dirname, "../aegonish-frontend/dist");
app.use(express.static(distPath));
console.log(`🚀 Serving static from: ${distPath}`);

// ✅ React Router fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

// ✅ MongoDB connection
const PORT = process.env.PORT || 4000;

// 💡 Force correct Mongo hostname for Docker
// Inside docker-compose, the "mongo" service name resolves automatically
const MONGO_URI =
  process.env.DOCKER_ENV === "true"
    ? "mongodb://mongo:27017/aegonish_blog"
    : process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aegonish_blog";

console.log("📦 Using Mongo URI:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB Error:", err));
