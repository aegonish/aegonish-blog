import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPost: React.FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:4000/api/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/posts/${id}`, { title, content });
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg border border-cyan-500/20">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:border-cyan-500 outline-none"
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:border-cyan-500 outline-none"
          rows={6}
          placeholder="Content"
          required
        />
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 rounded-lg transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;
