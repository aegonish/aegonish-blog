import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  _id: string;
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

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const deletePost = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await axios.delete(`http://localhost:4000/api/posts/${id}`);
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="pt-24">
      <h1 className="text-center text-5xl font-extrabold mb-12 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
        Aegonish Gallery
      </h1>

      {/* ✨ FIX: CSS grid layout for multiple columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl shadow-xl hover:shadow-cyan-400/40 transition-all hover:-translate-y-1 overflow-hidden"
          >
            {post.imageUrl && (
              <img
                src={resolveImageUrl(post.imageUrl)}
                alt={post.title}
                className="w-full h-60 object-cover transition-transform hover:scale-105"
              />
            )}

            <div className="p-5 flex flex-col">
              <h2 className="text-xl font-bold text-cyan-300 mb-2 truncate">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {post.content}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={`/post/${post._id}`}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                >
                  <Eye size={16} /> View
                </Link>
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm font-semibold"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="flex items-center gap-1 text-pink-400 hover:text-pink-300 text-sm font-semibold"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
