import React from "react";
import { Link } from "react-router-dom";

export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  mediaType?: "image" | "video";
  createdAt?: string;
}

const resolveMediaUrl = (url?: string) => {
  if (!url) return "/placeholder.png";
  try {
    const base = window.location.origin; // dynamic for localhost or Cloudflare
    if (url.includes("drive.google.com")) {
      const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (idMatch?.[1]) return `${base}/image/${idMatch[1]}`;
      const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (dMatch?.[1]) return `${base}/image/${dMatch[1]}`;
    }
    if (url.startsWith("http")) return url;
    return `${base}/image/${url}`;
  } catch {
    return "/placeholder.png";
  }
};

const PostCard: React.FC<{
  post: Post;
  onDelete?: (id: string) => void;
}> = ({ post, onDelete }) => {
  const src = resolveMediaUrl(post.imageUrl);
  const isVideo = post.mediaType === "video";

  return (
    <article className="bg-transparent rounded-lg p-4 shadow-glow border border-transparent hover:border-cyan-600 transition">
      <div className="w-full h-56 bg-gray-800 rounded-md overflow-hidden mb-4 flex items-center justify-center">
        {isVideo ? (
          <video
            src={src}
            controls
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={src}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).src = "/placeholder.png")
            }
          />
        )}
      </div>

      <h3 className="text-lg font-semibold text-cyan-200 mb-2">
        {post.title}
      </h3>
      <p className="text-sm text-gray-300 mb-4 line-clamp-3">
        {post.content}
      </p>

      <div className="flex gap-3">
        <Link
          to={`/post/${post._id}`}
          className="px-3 py-1 rounded bg-cyan-700 text-xs text-white hover:bg-cyan-600"
        >
          View
        </Link>
        <Link
          to={`/edit/${post._id}`}
          className="px-3 py-1 rounded bg-emerald-700 text-xs text-white hover:bg-emerald-600"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete && onDelete(post._id)}
          className="px-3 py-1 rounded bg-rose-700 text-xs text-white hover:bg-rose-600"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default PostCard;
