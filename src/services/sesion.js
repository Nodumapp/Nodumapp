// src/services/session.js
const LS_USER_KEY = "user";
const LS_AT_KEY   = "accessToken";

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(LS_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getAccessToken() {
  return localStorage.getItem(LS_AT_KEY) || null;
}

// (Opcional) intentar inferir del JWT si el backend mete claims como "email", "given_name", "family_name"
export function getUserFromToken() {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    const firstName = json.given_name || json.name?.split(" ")?.[0];
    const lastName  = json.family_name || (json.name?.split(" ")?.slice(1).join(" ") || "");
    const email     = json.email || json.sub || null;
    if (!email && !firstName) return null;
    return { firstName, lastName, email };
  } catch {
    return null;
  }
}
