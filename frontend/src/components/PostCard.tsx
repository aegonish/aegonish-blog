import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Edit3, Trash2 } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

const resolveImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.includes("drive.google.com")) {
    const m = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (m) return `http://localhost:4000/image/${m[1]}`;
  }
  return url.startsWith("http") ? url : `http://localhost:4000/image/${url}`;
};

const PostCard: React.FC<{ post: Post; onDelete: (id: string) => void }> = ({
  post,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 160 }}
      className="card-glass rounded-2xl overflow-hidden shadow-lg border border-cyan-500/15"
    >
      {post.imageUrl ? (
        <img
          src={resolveImageUrl(post.imageUrl)}
          alt={post.title}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-gray-800 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold text-cyan-300 truncate">{post.title}</h3>
        <p className="text-gray-300 text-sm mt-2 line-clamp-3">{post.content}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-3">
            <Link
              to={`/post/${post._id}`}
              className="p-2 rounded-md bg-white/5 hover:bg-white/7 transition"
              title="View"
            >
              <Eye size={16} className="text-cyan-300" />
            </Link>

            <button
              onClick={() => navigate(`/edit/${post._id}`)}
              className="p-2 rounded-md bg-white/5 hover:bg-white/7 transition"
              title="Edit"
            >
              <Edit3 size={16} className="text-green-300" />
            </button>
          </div>

          <button
            onClick={() => onDelete(post._id)}
            className="p-2 rounded-md bg-white/5 hover:bg-white/7 transition"
          >
            <Trash2 size={16} className="text-red-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
