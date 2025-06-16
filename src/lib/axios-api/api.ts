import axios from "axios";

const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL: isServer
    ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "/api",
});

export default api;