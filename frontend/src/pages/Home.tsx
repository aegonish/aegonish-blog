import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-cyan-400 text-center mb-8 drop-shadow-lg">
        Aegonish Blog Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-900/60 backdrop-blur-xl border border-cyan-400/20 rounded-2xl shadow-xl p-5 text-white flex flex-col hover:scale-[1.02] hover:shadow-cyan-400/30 transition-all"
            >
              {post.imageUrl ? (
                <img
                  src={resolveImageUrl(post.imageUrl)}
                  alt={post.title}
                  className="w-full h-56 object-cover rounded-lg mb-4 border border-cyan-500/10"
                />
              ) : (
                <div className="w-full h-56 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {post.content}
              </p>

              <div className="flex gap-4 justify-center">
                <Link
                  to={`/post/${post._id}`}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  View
                </Link>
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="text-green-400 hover:text-green-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
