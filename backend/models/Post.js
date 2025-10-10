// E:\aegonish-blog\backend\models\Post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  imageUrl: { type: String, required: true },
  mediaType: {
    type: String,
    enum: ["image", "video"],
    default: "image",
  },
  originalName: { type: String },
  size: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", PostSchema);
