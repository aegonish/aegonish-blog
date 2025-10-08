import axios from "axios";
import type { PostType } from "./types.ts";

const API_URL = "http://localhost:4000";

export const fetchPosts = () => axios.get<PostType[]>(`${API_URL}/posts`);
export const fetchPost = (id: string) => axios.get<PostType>(`${API_URL}/posts/${id}`);
export const createPost = (data: Omit<PostType, "_id" | "createdAt">) => axios.post(`${API_URL}/posts`, data);
export const updatePost = (id: string, data: Partial<Omit<PostType, "_id" | "createdAt">>) =>
  axios.put(`${API_URL}/posts/${id}`, data);
export const deletePost = (id: string) => axios.delete(`${API_URL}/posts/${id}`);
export const uploadFile = (formData: FormData) =>
  axios.post<{ url: string }>(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
