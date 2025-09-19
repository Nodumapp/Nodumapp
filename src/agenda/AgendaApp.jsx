// src/agenda/AgendaApp.jsx
import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/Calendar";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";

import "../styles/nodum-agenda.css";

// Util: iniciales a partir de user
function getInitials(user) {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
  if (name) {
    const parts = name.split(/\s+/);
    return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase();
  }
  const email = user?.email || "";
  return (email[0] || "U").toUpperCase();
}

export default function AgendaApp() {
  const navigate = useNavigate();

  // Levanto usuario guardado por login/registro
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const initials = getInitials(user);

  function goHome() {
    navigate("/");
  }

  function handleLogout() {
    // si tenés endpoint /auth/logout, llamalo acá
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // si guardaste user: localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <div className="agenda-layout">
      {/* SIDEBAR */}
      <aside className="agenda-sidebar">
        <button className="agenda-brand" onClick={goHome}>
          <img
            src={process.env.PUBLIC_URL + "images/NodumLogosinslogan.png"}
            alt="Nodum"
          />
        </button>

        <nav className="agenda-nav vstack gap-1">
          <NavLink
            end
            className={({ isActive }) => "agenda-link" + (isActive ? " active" : "")}
            to="."
          >
            Resumen
          </NavLink>
          <NavLink
            className={({ isActive }) => "agenda-link" + (isActive ? " active" : "")}
            to="calendar"
          >
            Calendario
          </NavLink>
          <NavLink
            className={({ isActive }) => "agenda-link" + (isActive ? " active" : "")}
            to="clients"
          >
            Clientes
          </NavLink>
          <NavLink
            className={({ isActive }) => "agenda-link" + (isActive ? " active" : "")}
            to="services"
          >
            Servicios
          </NavLink>
          <NavLink
            className={({ isActive }) => "agenda-link" + (isActive ? " active" : "")}
            to="staff"
          >
            Staff
          </NavLink>
          <NavLink
            className={({ isActive }) => "agenda-link" + (isActive ? " active" : "")}
            to="settings"
          >
            Configuración
          </NavLink>
        </nav>

        <div className="agenda-sidebar-footer text-muted small">Agenda v1.0</div>
      </aside>

      {/* MAIN */}
      <main className="agenda-main">
        {/* TOPBAR */}
        <header className="agenda-topbar">
          <div className="agenda-topbar-left">
            <h4 className="m-0">Agenda</h4>
          </div>

          <div className="agenda-topbar-right">
            <div className="me-3 text-end">
              <div className="fw-semibold">
                {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Usuario"}
              </div>
              <div className="text-muted small">{user?.email || "usuario@nodum.app"}</div>
            </div>

            <div className="agenda-user">
              <div className="agenda-avatar" aria-hidden>
                {initials}
              </div>
              <button type="button" className="logoutBtn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>

        {/* RUTAS ANIDADAS */}
        <div className="agenda-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="clients" element={<Clients />} />
            <Route path="services" element={<Services />} />
            <Route path="staff" element={<Staff />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<div className="card p-4">No encontrado</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
