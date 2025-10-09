import React from "react";

interface NavbarProps {
  onUploadClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onUploadClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/70 backdrop-blur-lg border-b border-cyan-400/20">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Aegonish Blog
        </h1>
        <button
          onClick={onUploadClick}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          + Upload
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
