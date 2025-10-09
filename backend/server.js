import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";
import postRoutes from "./routes/posts.js";
import imageProxyRoutes from "./routes/imageProxy.js"; // ✅ Add this

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postRoutes);
app.use("/image", imageProxyRoutes); // ✅ Serve images through proxy

// Fallback for unknown routes
app.use((req, res) => res.status(404).send("Not Found"));

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`✅ MongoDB Connected`);
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Error:", err));
