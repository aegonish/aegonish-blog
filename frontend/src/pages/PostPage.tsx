import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const resolveImageUrl = (url?: string) => {
  if (!url) return "";
  const m = url.match(/id=([a-zA-Z0-9_-]+)/);
  return m ? `http://localhost:4000/image/${m[1]}` : url;
};

const PostPage: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:4000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <div className="text-center mt-20 text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {post.imageUrl && (
          <img
            src={resolveImageUrl(post.imageUrl)}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl mb-6"
          />
        )}
        <h1 className="text-3xl font-bold text-cyan-300 mb-4">{post.title}</h1>
        <p className="text-gray-300 leading-relaxed">{post.content}</p>
      </div>
    </div>
  );
};

export default PostPage;
