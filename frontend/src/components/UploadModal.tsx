import React, { useState } from "react";
import axios from "axios";

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);

    try {
      setLoading(true);
      await axios.post("http://localhost:4000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      <div className="relative bg-gray-900/90 border border-cyan-400/30 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.4)] p-8 w-[90%] max-w-lg text-gray-100 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Upload Post
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 outline-none"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 outline-none"
            rows={4}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-gray-300"
            required
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="rounded-xl mt-2 h-40 w-full object-cover border border-gray-700"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 mt-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
