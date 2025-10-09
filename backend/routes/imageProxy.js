// backend/routes/imageProxy.js
import express from "express";
import axios from "axios";

const router = express.Router();

// Serve Google Drive image by ID
router.get("/:id", async (req, res) => {
  const fileId = req.params.id;
  const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  try {
    const response = await axios.get(driveUrl, {
      responseType: "arraybuffer",
    });

    const contentType =
      response.headers["content-type"] || "image/jpeg";
    res.setHeader("Content-Type", contentType);
    res.send(response.data);
  } catch (error) {
    console.error("❌ Error fetching image:", error.message);
    res.status(404).send("Image not found");
  }
});

export default router;
