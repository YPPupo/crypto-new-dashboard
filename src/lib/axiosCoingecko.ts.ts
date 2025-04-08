import axios from "axios";

// Instancia para CoinGecko
export const axiosCoingecko = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Opcional: interceptores para manejar tokens, errores, logs, etc.
axiosCoingecko.interceptors.request.use(
  (config) => {
    // Ejemplo: si usas un token de autenticación
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ejemplo de interceptor
axiosCoingecko.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores global para CoinGecko
    return Promise.reject(error);
  }
);

export default axiosCoingecko;
