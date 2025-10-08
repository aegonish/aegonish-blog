import React, { useState } from "react";
import axios from "axios";

const UploadPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);

    try {
      const res = await axios.post("http://localhost:4000/upload", formData);
      setMessage("✅ Upload successful!");
      console.log(res.data);
      setTitle("");
      setContent("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Check console.");
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Upload New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg w-full h-64 object-cover border"
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Upload
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default UploadPost;
