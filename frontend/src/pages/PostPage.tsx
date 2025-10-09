import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Post {
  title: string;
  content: string;
  imageUrl?: string;
}

const resolveImageUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("drive.google.com")) {
    const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (idMatch) return `http://localhost:4000/image/${idMatch[1]}`;
  }
  if (url.startsWith("http")) return url;
  return `http://localhost:4000/image/${url}`;
};

const PostPage: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error loading post:", err));
  }, [id]);

  if (!post) return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 text-white">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400 text-center">
        {post.title}
      </h1>
      {post.imageUrl && (
        <img
          src={resolveImageUrl(post.imageUrl)}
          alt={post.title}
          className="w-full h-96 object-cover rounded-2xl mb-8 border border-cyan-500/20"
        />
      )}
      <p className="text-gray-300 leading-relaxed">{post.content}</p>
    </div>
  );
};

export default PostPage;
