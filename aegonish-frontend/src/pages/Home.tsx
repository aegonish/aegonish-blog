// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import PostCard from "../components/PostCard";
import UploadModal from "../components/UploadModal";
import type { Post } from "../components/PostCard";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/posts");
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. See console.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-cyan-300">Aegonish Gallery</h1>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-gradient-to-br from-orange-400 to-rose-500 px-4 py-2 rounded text-white shadow"
        >
          Upload
        </button>
      </div>

      {loading ? (
        <div className="text-cyan-200">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-gray-300">No posts yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <UploadModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onUploaded={fetchPosts}
        initial={null}
      />
    </div>
  );
};

export default Home;
