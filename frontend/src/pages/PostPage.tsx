// src/pages/PostPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";

const resolveImageUrl = (url?: string) => {
  if (!url) return "/placeholder.png";
  if (url.includes("drive.google.com")) {
    const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (idMatch?.[1]) return `http://localhost:4000/image/${idMatch[1]}`;
    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (dMatch?.[1]) return `http://localhost:4000/image/${dMatch[1]}`;
  }
  if (url.startsWith("http")) return url;
  return `http://localhost:4000/image/${url}`;
};

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/api/posts/${id}`)
      .then((r) => setPost(r.data))
      .catch((e) => {
        console.error(e);
        setPost(null);
      });
  }, [id]);

  if (!post) return <div className="p-6 text-gray-300">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <Link to="/" className="text-cyan-400">← back</Link>

      <h1 className="text-3xl mt-4 text-cyan-200">{post.title}</h1>

      <div className="mt-6 w-full md:w-3/4">
        <img
          src={resolveImageUrl(post.imageUrl)}
          alt={post.title}
          className="w-full object-cover rounded"
          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
        />
      </div>

      <p className="mt-4 text-gray-300">{post.content}</p>
    </div>
  );
};

export default PostPage;
