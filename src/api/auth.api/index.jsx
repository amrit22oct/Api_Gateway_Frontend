import api from "../index.jsx";

// ===============================
// LOGIN
// ===============================
export const loginApi = async (credentials) => {
  const res = await api.post("/auth/login", credentials);

  const data = res.data;

  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }

  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  // Store user information
  const user = {
    userId: data.userId,
    name: data.name,
    email: data.email,
    role: data.role,
  };

  localStorage.setItem("user", JSON.stringify(user));

  return data;
};

// ===============================
// REGISTER
// ===============================
export const registerApi = async (data) => {
  const res = await api.post("/auth/register", data);

  return res.data;
};

// ===============================
// LOGOUT
// ===============================
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  window.location.href = "/login";
};