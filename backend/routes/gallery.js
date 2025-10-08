import express from "express";
import { listFiles, deleteFile } from "../controllers/drive.js";

const router = express.Router();

router.get("/", (req, res) => {
  const files = listFiles();
  res.json(files);
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteFile(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
