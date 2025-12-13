// services/http.ts
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer example-token";
  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default http;
