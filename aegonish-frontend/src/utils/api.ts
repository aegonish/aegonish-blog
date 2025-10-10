// src/utils/api.ts
import axios from "axios";

// Determine backend base URL
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : window.location.origin);

// ✅ baseURL is just the root server, not /api
const api = axios.create({
  baseURL: API_BASE,
});

export default api;
