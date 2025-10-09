// src/utils/api.ts
import axios from "axios";

export const API_BASE = "http://localhost:4000";

const client = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

export default client;
