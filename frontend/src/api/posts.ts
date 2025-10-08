export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

const BASE_URL = "http://localhost:4000";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}
