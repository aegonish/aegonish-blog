import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UploadPost: React.FC = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [changeImage, setChangeImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title ?? "");
          setContent(res.data.content ?? "");
          setChangeImage(false);
        })
        .catch((err) => {
          console.error("Failed to load post for edit:", err);
          alert("Failed to load post.");
        });
    }
  }, [id]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setMediaType(f.type.startsWith("video/") ? "video" : "image");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // --- EDIT MODE ---
        if (changeImage && file) {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("title", title);
          fd.append("content", content);
          await axios.put(`http://localhost:4000/api/posts/${id}`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          await axios.put(`http://localhost:4000/api/posts/${id}`, {
            title,
            content,
          });
        }
        window.location.href = "/";
        return;
      }

      // --- CREATE MODE ---
      const form = new FormData();
      if (file) form.append("file", file);
      form.append("title", title);
      form.append("content", content);

      await axios.post("http://localhost:4000/api/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      window.location.href = "/";
    } catch (err) {
      console.error("Upload/Edit failed:", err);
      alert("Operation failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card-glass w-full max-w-lg p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">
          {id ? "Edit Post" : "Upload New Post"}
        </h2>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            className="p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
          />

          {id ? (
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={changeImage}
                  onChange={() => setChangeImage((v) => !v)}
                />
                <span className="text-sm text-gray-300">
                  Change image/video?
                </span>
              </label>
            </div>
          ) : null}

          {(!id || changeImage) && (
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFile}
              className="text-gray-300"
              {...(!id ? { required: true } : {})}
            />
          )}

          {/* --- Preview block --- */}
          {preview && (
            <div className="mt-2">
              {mediaType === "video" ? (
                <video
                  src={preview}
                  controls
                  className="rounded-md w-full max-h-80 object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-md w-full max-h-80 object-contain"
                />
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white font-semibold"
          >
            {loading ? "Saving..." : id ? "Save Changes" : "Upload Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
