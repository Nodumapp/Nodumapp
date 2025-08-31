// src/services/api.js
const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080"; // Spring Boot por defecto

export async function http(path, { method = "GET", body, headers, auth = false } = {}) {
  const token = auth ? localStorage.getItem("accessToken") : null;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // quitalo si no usás cookies
  });

  // Intentar parsear respuesta
  let payload = null;
  const text = await res.text();
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text || null;
  }

  if (!res.ok) {
    const message =
      (payload && (payload.message || payload.error)) ||
      `${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}
