// src/services/authService.js

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

/**
 * Inicia sesión
 * Espera que el backend devuelva { accessToken, refreshToken?, user? }
 */
export async function authLogin(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // Intenta leer el cuerpo siempre para exponer mensaje de error del backend
  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `Error ${res.status}`;
    throw new Error(msg);
  }
  return data; // { accessToken, refreshToken?, user? }
}

/**
 * Registro de usuario
 * payload: { firstName, lastName, email, password }
 * Ajustá el shape si tu backend espera otros nombres.
 */
export async function authRegister(payload) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `Error ${res.status}`;
    throw new Error(msg);
  }
  return data; // muchos backends devuelven el usuario creado
}

