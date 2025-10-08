// E:\aegonish-blog\backend\routes\image.js
import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config(); // make sure .env is loaded for this file too

const router = express.Router();

// use a shared OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// double-check env load
console.log("🔑 Image route using refresh token:", process.env.GOOGLE_REFRESH_TOKEN ? "✅ loaded" : "❌ missing");

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const drive = google.drive({ version: "v3", auth: oauth2Client });

// Stream image directly from Drive
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await drive.files.get(
      { fileId: id, alt: "media" },
      { responseType: "stream" }
    );

    res.setHeader("Content-Type", "image/jpeg");
    response.data.pipe(res);
  } catch (err) {
    console.error("Drive proxy error:", err.message);
    res.status(500).send("Image fetch failed");
  }
});

export default router;
