import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// 🟢 Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// 🟢 Get a specific post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
});

// 🟢 Create new post
router.post("/", async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const post = new Post({ title, content, imageUrl });
  await post.save();
  res.status(201).json(post);
});

// 🟡 Update post
router.put("/:id", async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, imageUrl },
    { new: true }
  );
  res.json(post);
});

// 🔴 Delete post
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

export default router;
