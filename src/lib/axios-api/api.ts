import axios from "axios";

const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL: isServer
    ? `${process.env.NEXTAUTH_URL}/api` || "http://localhost:3000/api" // fallback for local dev
    : "/api",
});

export default api;
