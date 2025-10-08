// E:\aegonish-blog\backend\routes\upload.js

import dotenv from "dotenv";
dotenv.config({ path: "./.env", override: true });


// E:\aegonish-blog\backend\routes\upload.js
import express from "express";
import multer from "multer";
import fs from "fs";
import { google } from "googleapis";
import Post from "../models/Post.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// --- Load Google credentials ---
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_DRIVE_FOLDER_ID,
} = process.env;

// --- Initialize OAuth2 client ---
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    console.log("📤 Uploading file:", req.file.originalname);

    // --- Upload to specific Drive folder ---
    const fileMetadata = {
      name: req.file.originalname,
      parents: [GOOGLE_DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    const { data } = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
    });

    console.log("✅ File uploaded to Drive:", data.id);

    // --- Try making it public ---
    try {
      await drive.permissions.create({
        fileId: data.id,
        requestBody: { role: "reader", type: "anyone" },
      });
      console.log("🌍 File permissions updated to public.");
    } catch (permErr) {
      console.error("⚠️ Permission update failed:", permErr.message);
    }

    // --- Use the proper 'export=view' public URL ---
    const imageUrl = `https://drive.google.com/uc?export=view&id=${data.id}`;

    await fs.promises.unlink(req.file.path);

    const { title = "Untitled Post", content = "No description." } = req.body;
    const post = new Post({ title, content, imageUrl });
    await post.save();

    res.status(201).json({ message: "File uploaded and post created", post });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

export default router;
