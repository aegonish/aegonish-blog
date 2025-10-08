// E:\aegonish-blog\backend\server.js
import dotenv from "dotenv";
dotenv.config();

import imageRouter from "./routes/image.js";


console.log("🔍 ENV Check:", {
  id: !!process.env.GOOGLE_CLIENT_ID,
  secret: !!process.env.GOOGLE_CLIENT_SECRET,
  refresh: process.env.GOOGLE_REFRESH_TOKEN ? "loaded ✅" : "missing ❌",
});

console.log("🔍 ENV Check:", {
  refresh: process.env.GOOGLE_REFRESH_TOKEN ? "loaded ✅" : "missing ❌",
});

import express from "express";
import mongoose from "mongoose";

import cors from "cors";

// Routes
import uploadRouter from "./routes/upload.js";
import postsRouter from "./routes/posts.js";

// Load environment variables


console.log("Refresh token loaded:", process.env.GOOGLE_REFRESH_TOKEN ? "yes" : "no");

console.log("OAuth credentials seen by server:");
console.log({
  id: process.env.GOOGLE_CLIENT_ID?.slice(0, 10) + "...",
  secret: process.env.GOOGLE_CLIENT_SECRET ? "yes" : "no",
  redirect: process.env.GOOGLE_REDIRECT_URI,
  refresh: process.env.GOOGLE_REFRESH_TOKEN?.slice(0, 10) + "...",
});


const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aegonish_blog";

app.use("/image", imageRouter);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/upload", uploadRouter);
app.use("/posts", postsRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Aegonish Blog Backend API is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
