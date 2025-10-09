import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  imageUrl: string;
}

interface Props {
  posts: Post[];
}

const resolveImageUrl = (url: string) => {
  if (!url) return "";
  const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
  return idMatch ? `http://localhost:4000/image/${idMatch[1]}` : url;
};

const HeroCarousel: React.FC<Props> = ({ posts }) => {
  if (posts.length === 0) return null;
  const featured = posts.slice(0, 3);

  return (
    <div className="relative w-full mb-12">
      <div className="overflow-hidden rounded-3xl shadow-lg">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          {[...featured, ...featured].map((post, i) => (
            <Link key={i} to={`/post/${post._id}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="min-w-full relative h-[420px]"
              >
                <img
                  src={resolveImageUrl(post.imageUrl)}
                  alt={post.title}
                  className="object-cover w-full h-full opacity-80 hover:opacity-100 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 flex items-end">
                  <h2 className="text-3xl font-bold text-cyan-300">
                    {post.title}
                  </h2>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroCarousel;
