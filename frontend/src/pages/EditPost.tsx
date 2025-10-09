// src/pages/EditPost.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/api/posts/${id}`).then((r) => {
      const data = r.data;
      setTitle(data.title ?? "");
      setContent(data.content ?? "");
    }).catch((e) => {
      console.error("Fetch post:", e);
    });
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    try {
      await api.put(`/api/posts/${id}`, { title, content });
      nav("/");
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Edit failed. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl text-cyan-200 mb-4">Edit Post</h2>
      <form onSubmit={submit} className="max-w-2xl">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 bg-[#04121a] border border-cyan-800 rounded text-white"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full mb-3 p-2 bg-[#04121a] border border-cyan-800 rounded text-white"
        />
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded bg-gray-700 text-white">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-cyan-600 text-white">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
