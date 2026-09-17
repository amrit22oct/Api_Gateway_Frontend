import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// ===============================
// REQUEST INTERCEPTOR
// ===============================

api.interceptors.request.use(
  (config) => {

    // Authentication endpoints don't need
    // an existing access token.
    const isAuthRequest =
      config.url?.startsWith("/auth/");

    if (!isAuthRequest) {

      const token =
        localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ===============================
// RESPONSE INTERCEPTOR
// ===============================

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default api;