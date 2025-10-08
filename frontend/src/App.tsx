import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import UploadPost from "./pages/UploadPost";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/upload" element={<UploadPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
