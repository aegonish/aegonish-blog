import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import UploadModal from "./components/UploadModal";

const App: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navbar onUploadClick={() => setShowUpload(true)} />
      <main className="container mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </main>
      <Footer />
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
};

export default App;
