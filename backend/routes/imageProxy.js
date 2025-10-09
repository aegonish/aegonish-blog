import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://drive.google.com/uc?export=view&id=${id}`,
      { responseType: "arraybuffer" }
    );
    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (err) {
    console.error("Drive proxy error:", err.message);
    res.status(500).send("Failed to fetch image");
  }
});

export default router;
