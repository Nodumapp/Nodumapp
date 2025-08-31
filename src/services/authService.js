// src/services/authService.js
const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

async function parseJsonSafe(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return null; }
}

export async function authLogin({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await parseJsonSafe(res);
    throw new Error(err?.message || `Login failed (${res.status})`);
  }
  return res.json(); // { accessToken, refreshToken?, user? } (ajusta a tu backend)
}

// si quieres, puedes exportar más funciones aquí (register, me, etc.)
export default { authLogin };
