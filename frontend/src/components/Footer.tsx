import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-cyan-700/6 text-center text-gray-400">
      © {new Date().getFullYear()} Aegonish Blog — Neon vibes.
    </footer>
  );
};

export default Footer;
