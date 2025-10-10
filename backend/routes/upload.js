// E:\aegonish-blog\backend\routes\upload.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env", override: true });

import express from "express";
import multer from "multer";
import fs from "fs";
import { google } from "googleapis";
import Post from "../models/Post.js";

const router = express.Router();

// ✅ Allow up to 200MB uploads (suitable for short videos)
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 200 * 1024 * 1024 },
});

// ✅ Wrap Drive client creation in a function so env vars load correctly
function createDriveClient() {
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_DRIVE_FOLDER_ID,
  } = process.env;

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

  const drive = google.drive({ version: "v3", auth: oauth2Client });
  return { drive, folderId: GOOGLE_DRIVE_FOLDER_ID };
}

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const { drive, folderId } = createDriveClient();
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    const isVideo = mimeType.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";

    console.log(`📤 Uploading ${mediaType}: ${req.file.originalname}`);

    // --- Upload to Google Drive ---
    const fileMetadata = {
      name: req.file.originalname,
      parents: [folderId],
    };

    const media = {
      mimeType,
      body: fs.createReadStream(filePath),
    };

    const { data } = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
    });

    console.log("✅ Uploaded to Drive:", data.id);

    // --- Make file public ---
    try {
      await drive.permissions.create({
        fileId: data.id,
        requestBody: { role: "reader", type: "anyone" },
      });
      console.log("🌍 Public permissions set");
    } catch (permErr) {
      console.error("⚠️ Permission error:", permErr.message);
    }

    // --- Generate proper public URL ---
    const fileUrl = `https://drive.google.com/uc?export=view&id=${data.id}`;

    await fs.promises.unlink(filePath);

    // --- Save post in DB ---
    const { title = "Untitled", content = "" } = req.body;
    const post = new Post({
      title,
      content,
      imageUrl: fileUrl,
      mediaType,
      originalName: req.file.originalname,
      size: req.file.size,
    });
    await post.save();

    res.status(201).json({
      message: "File uploaded and post created",
      post,
    });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

export default router;
