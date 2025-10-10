// backend/routes/imageProxy.js
import express from "express";
import axios from "axios";

const router = express.Router();

// ✅ Handle Google Drive image or video streaming
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Missing file ID");

  // Always use direct-download URL (export=download)
  const driveUrl = `https://drive.google.com/uc?export=download&id=${id}`;

  try {
    const response = await axios.get(driveUrl, {
      responseType: "stream",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
    });

    const contentType = response.headers["content-type"] || "application/octet-stream";
    res.setHeader("Content-Type", contentType);

    response.data.pipe(res);
  } catch (err) {
    console.error("❌ Proxy error for file ID:", id, "-", err.message);

    // Fallback: send placeholder
    res.redirect("https://via.placeholder.com/800x600?text=Image+Unavailable");
  }
});

export default router;
