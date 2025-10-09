// src/components/UploadModal.tsx
import React, { useState } from "react";
import api, { API_BASE } from "../utils/api";

type Props = {
  open: boolean;
  onClose: () => void;
  onUploaded?: () => void;
  initial?: { id?: string; title?: string; content?: string; imageUrl?: string } | null;
};

const UploadModal: React.FC<Props> = ({ open, onClose, onUploaded, initial }) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // reset when closed/opened
  React.useEffect(() => {
    setTitle(initial?.title ?? "");
    setContent(initial?.content ?? "");
    setFile(null);
  }, [open, initial]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      if (file) form.append("file", file);
      form.append("title", title);
      form.append("content", content);

      // if initial has id, call update endpoint (no file replacement if no file)
      if (initial?.id) {
        // PUT expects JSON for your backend — adjust if you expect multipart
        await api.put(`/api/posts/${initial.id}`, { title, content });
      } else {
        await api.post("/api/upload", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onUploaded && onUploaded();
      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. See console.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      <form
        onSubmit={handleUpload}
        className="relative z-50 bg-[#071422] border border-cyan-800 p-6 rounded-xl w-[min(780px,92%)] shadow-xl"
      >
        <h2 className="text-2xl text-cyan-200 mb-4">Upload a New Post</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 bg-[#04121a] border border-cyan-800 rounded text-white"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full mb-3 p-2 bg-[#04121a] border border-cyan-800 rounded text-white"
        />

        <div className="flex items-center gap-3 mb-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm text-gray-300"
            accept="image/*"
          />
          <div className="text-xs text-gray-400">{file?.name}</div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-700 text-white">
            Cancel
          </button>
          <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-cyan-500 text-white">
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadModal;
