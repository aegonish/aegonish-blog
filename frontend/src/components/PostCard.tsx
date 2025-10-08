// src/components/PostCard.tsx
import React from "react";

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt?: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="border rounded-xl shadow-sm p-4 flex flex-col gap-2 bg-white">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-60 object-cover rounded-lg"
        />
      )}
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
      {post.createdAt && (
        <p className="text-sm text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default PostCard;
