import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-gray-800 dark:bg-gray-900 text-white shadow-lg">
      <Link to="/" className="text-2xl font-bold hover:text-indigo-400">
        Aegonish Blog
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-indigo-400">
          Home
        </Link>
        <Link to="/upload" className="hover:text-indigo-400">
          Upload
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
