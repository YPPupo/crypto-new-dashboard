import axios from "axios";

// Instancia para Alternative.me
const axiosAlternativeMe = axios.create({
  baseURL: "https://api.alternative.me",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Opcional: interceptores para manejar tokens, errores, logs, etc.
axiosAlternativeMe.interceptors.request.use(
  (config) => {
    // Ejemplo: si usas un token de autenticación
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptores si son necesarios
axiosAlternativeMe.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores global para alternative.me
    return Promise.reject(error);
  }
);

export default axiosAlternativeMe;
