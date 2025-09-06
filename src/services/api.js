// src/services/api.js
const isDev = process.env.NODE_ENV === "development";

// En dev permitimos localhost; en producción EXIGIMOS REACT_APP_API_URL
const API_BASE = isDev
  ? (process.env.REACT_APP_API_URL || "http://localhost:3001") // solo en dev
  : (process.env.REACT_APP_API_URL || ""); // en prod no debe quedar vacío

if (!API_BASE && !isDev) {
  // Evita builds/ejecución en Vercel apuntando a localhost
  throw new Error("REACT_APP_API_URL no está configurada para producción.");
}

export async function http(path, { method = "GET", body, headers, auth = false } = {}) {
  const token = auth ? localStorage.getItem("accessToken") : null;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const text = await res.text();
  let payload = null;
  try { payload = text ? JSON.parse(text) : null; } catch { payload = text || null; }

  if (!res.ok) {
    const message = (payload && (payload.message || payload.error)) || `${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return payload;
}

