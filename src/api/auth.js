import api from "./client";

// Registro
export const register = (payload) => api.post("/auth/register", payload);

// Login
export const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

// Verificar access token
export const verifyToken = () => api.post("/auth/verify-token");

// Refresh con el refreshToken en Authorization
export const refreshToken = async () => {
  const rfs = localStorage.getItem("refreshToken");
  const { data } = await api.post(
    "/auth/refresh-token",
    {},
    { headers: { Authorization: `Bearer ${rfs}` } }
  );
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

// Logout helper
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
