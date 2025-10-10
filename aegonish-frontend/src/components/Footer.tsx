import React from "react";
const Footer: React.FC = () => {
  return (
    <footer className="py-6 mt-10 border-t border-cyan-600/8 text-center text-gray-300">
      © {new Date().getFullYear()} Aegonish Blog — neon vibes.
    </footer>
  );
};
export default Footer;
