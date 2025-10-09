import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  isEdit?: boolean;
}

const UploadPost: React.FC<Props> = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      axios
        .get(`http://localhost:4000/api/posts/${id}`)
        .then((res) => {
          const post = res.data;
          setTitle(post.title);
          setContent(post.content);
        })
        .catch((err) => console.error("Error fetching post:", err));
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);

    try {
      if (isEdit && id) {
        await axios.put(`http://localhost:4000/api/posts/${id}`, {
          title,
          content,
        });
        alert("Post updated successfully!");
      } else {
        await axios.post("http://localhost:4000/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Post uploaded successfully!");
      }
      navigate("/");
    } catch (err) {
      console.error("Error submitting post:", err);
      alert("Error submitting post");
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-lg p-8 w-full max-w-lg text-white"
      >
        <h1 className="text-3xl font-bold mb-6 text-cyan-400">
          {isEdit ? "Edit Post" : "Upload New Post"}
        </h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-cyan-500/30 text-white"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-cyan-500/30 text-white"
          required
        />

        {!isEdit && (
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full mb-6 text-gray-300"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-semibold transition"
        >
          {isEdit ? "Save Changes" : "Upload Post"}
        </button>
      </form>
    </div>
  );
};

export default UploadPost;
