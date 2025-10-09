import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#071226] text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
