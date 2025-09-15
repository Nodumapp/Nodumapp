// src/pages/OAuth2Redirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export default function OAuth2Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    async function finish() {
      try {
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        } else {
          // Si no vino access, intentá refrescar usando la cookie HttpOnly
          const r = await fetch(`${API_URL}/auth/refresh`, { method: "POST", credentials: "include" });
          if (!r.ok) throw new Error("No se pudo refrescar sesión");
          const data = await r.json();
          if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);
        }

        // Obtener datos del usuario
        const t = localStorage.getItem("accessToken");
        const me = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${t}` },
          credentials: "include",
        });
        const user = await me.json();
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/Panel", { replace: true });
      } catch (e) {
        console.error(e);
        navigate("/login", { replace: true });
      }
    }
    finish();
  }, [navigate]);

  return <div style={{ padding: 24 }}>Conectando...</div>;
}
