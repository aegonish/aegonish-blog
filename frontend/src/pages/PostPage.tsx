import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../api/api";
import type { PostType } from "../api/types";

const PostPage: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost(id)
        .then((res) => setPost(res.data))
        .catch(console.error);
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="card max-w-3xl mx-auto">
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="rounded-lg mb-4 w-full" />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostPage;
