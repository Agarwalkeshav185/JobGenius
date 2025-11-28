import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000, // 10s timeout
  headers: {
    "Content-Type": "application/json" // default for most APIs
  }
});

// 🔹 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: inject token from localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle common errors globally
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        // Optionally redirect to login page
        // window.location.href = "/login";
      } else if (status >= 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;