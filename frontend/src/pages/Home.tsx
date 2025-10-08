// frontend/src/pages/Home.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📰 Aegonish Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const id = post.imageUrl.split("id=")[1];
          const primary = `https://drive.google.com/uc?export=download&id=${id}`;
          const fallback = `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
          return (
            <div key={post._id} className="rounded-xl shadow-lg overflow-hidden bg-white">
              <img
                src={`http://localhost:4000/image/${post.imageUrl.split("id=")[1]}`}
                alt={post.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
