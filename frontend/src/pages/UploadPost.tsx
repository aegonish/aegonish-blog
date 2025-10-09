import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UploadPost: React.FC = () => {
  const { id } = useParams(); // id present when editing (route /edit/:id)
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [changeImage, setChangeImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title ?? "");
          setContent(res.data.content ?? "");
          setChangeImage(false); // by default don't change image
        })
        .catch((err) => {
          console.error("Failed to load post for edit:", err);
          alert("Failed to load post.");
        });
    }
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // EDIT mode
        if (changeImage && file) {
          // multipart with file
          const fd = new FormData();
          fd.append("file", file);
          fd.append("title", title);
          fd.append("content", content);
          await axios.put(`http://localhost:4000/api/posts/${id}`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          // no file: send JSON update
          await axios.put(`http://localhost:4000/api/posts/${id}`, {
            title,
            content,
          });
        }

        // ensure homepage shows updated content
        window.location.href = "/";
        return;
      }

      // CREATE mode
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
                <span className="text-sm text-gray-300">Change image?</span>
              </label>
            </div>
          ) : null}

          {(!id || changeImage) && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-gray-300"
              {...(!id ? { required: true } : {})}
            />
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
