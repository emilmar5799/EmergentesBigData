import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// Crear la instancia
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});


// Interceptor JWT sin errores de TypeScript
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
