import React, { useState } from "react";
import UploadModal from "./UploadModal";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-gray-900/60 border-b border-cyan-500/20 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Brand / Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent select-none"
        >
          Aegonish Blog
        </motion.h1>

        {/* Upload Button */}
      {/*  <motion.button
  //        whileHover={{ scale: 1.1 }}
  //        whileTap={{ scale: 0.95 }}
  //        onClick={() => setIsUploadOpen(true)}
 //         className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-full font-semibold hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-300"
 //       >
 //</div>         Upload New
 //       </motion.button>

        {/* Upload Modal */}
         <UploadModal open={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;
