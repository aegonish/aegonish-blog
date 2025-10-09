// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC<{ onOpenUpload?: () => void }> = ({ onOpenUpload }) => {
  return (
    <nav className="w-full bg-[#04121a] border-b border-cyan-900 py-4 px-6 fixed top-0 z-30">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-cyan-300">ÆGONISH</div>

        <div className="flex gap-4 items-center">
          <Link to="/" className="text-cyan-200">
            Home
          </Link>
          <button
            onClick={() => onOpenUpload && onOpenUpload()}
            className="px-3 py-1 rounded bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow"
          >
            Upload
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
