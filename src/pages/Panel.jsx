import { Link } from "react-router-dom";
import "../styles/Panel.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useEffect, useState } from "react";
import { getStoredUser, getUserFromToken } from "../services/sesion";
import { authMe } from "../services/authService";

export default function Panel() {
  const navigate = useNavigate();

  // 1) datos iniciales desde localStorage o desde el JWT
  const [user, setUser] = useState(() => getStoredUser() || getUserFromToken());

  // 2) refrescar desde el backend si hay token válido
  useEffect(() => {
    (async () => {
      try {
        const fresh = await authMe(); // debe devolver { firstName,lastName,email,... }
        if (fresh) {
          localStorage.setItem("user", JSON.stringify(fresh));
          setUser(fresh);
        }
      } catch {
        // si falla, dejamos lo local; si querés, podrías forzar logout aquí
      }
    })();
  }, []);

  // 3) logout
  async function handleLogout() {
    try {
      await logout({ hitServer: false }); // poné true si implementás /auth/logout
    } finally {
      navigate("/login", { replace: true });
    }
  }

  const avatarLetter =
    (user?.firstName?.[0] || user?.email?.[0] || "U").toUpperCase();

  const fullName =
    (user?.firstName || "Usuario") + (user?.lastName ? ` ${user.lastName}` : "");

     const appRoutes = {
    agenda: "/agenda",
    erp: "/erp",
    tienda: "/tienda",
    analytics: "/analytics",
    helpdesk: "/helpdesk",
    crm: "/crm",
  };
   // Habilitadas hoy (dejamos solo Agenda operativa)
  const enabledApps = new Set(["agenda"]);

  const apps = [
    { key: "agenda", name: "Agenda", desc: "Turnos, reuniones y recordatorios" },
    { key: "erp", name: "ERP", desc: "Gestión y procesos" },
    { key: "tienda", name: "Tienda", desc: "Ventas online" },
    { key: "analytics", name: "Analytics", desc: "Dashboards y reportes" },
    { key: "helpdesk", name: "Helpdesk", desc: "Tickets y soporte" },
    { key: "crm", name: "CRM", desc: "Contactos y oportunidades" },
  ];
  return (
    <div className="panel">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <img
            src={process.env.PUBLIC_URL + "/images/Nodum-Logo-solo-color-sin-slogan (1).png"}
            alt="Nodum"
          />
        </div>

        <nav className="menu">
          <p className="menu-title">Navegación</p>
          <Link to="/" className="menu-item active">
            <span className="mi-dot" /> Inicio
          </Link>
          <button className="menu-item" type="button">
            <span className="mi-apps" /> Mis apps
          </button>
          <button className="menu-item" type="button">
            <span className="mi-cog" /> Ajustes
          </button>
          <button className="menu-item" type="button" disabled>
            <span className="mi-billing" /> Facturación
          </button>
        </nav>

        <div className="sidebar-footer">
          <p className="muted">Versión 0.1.0</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="logoutBtn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="content">
        {/* Topbar */}
        <header className="topbar">
          <div className="search">
            <input placeholder="Buscar en Nodum…" />
          </div>
          <div className="user">
            <div className="avatar" aria-hidden>{avatarLetter}</div>
            <div className="user-info">
              <strong>{fullName}</strong>
              <span className="muted">{user?.email || "sin-email@nodum.app"}</span>
            </div>
          </div>
        </header>

        {/* Stats (todo en cero) */}
        <section className="grid stats">
          <article className="card stat">
            <p className="label">Ingresos</p>
            <h3 className="value">$ 0</h3>
            <p className="hint muted">Últimos 30 días</p>
          </article>
          <article className="card stat">
            <p className="label">Órdenes</p>
            <h3 className="value">0</h3>
            <p className="hint muted">Hoy</p>
          </article>
          <article className="card stat">
            <p className="label">Usuarios activos</p>
            <h3 className="value">0</h3>
            <p className="hint muted">Tiempo real</p>
          </article>
          <article className="card stat">
            <p className="label">Tasa de conversión</p>
            <h3 className="value">0%</h3>
            <p className="hint muted">Semana</p>
          </article>
        </section>

        {/* Apps */}
       <section className="section">
      <div className="section-head">
        <h2>Tus apps</h2>
        <span className="muted">Activá módulos cuando los necesites</span>
      </div>

      <div className="grid apps">
        {apps.map((app) => {
          const isEnabled = enabledApps.has(app.key);
          const to = appRoutes[app.key];

          return (
            <article className="card app" key={app.key}>
              <div className={`app-icon ${app.key}`} aria-hidden />
              <h3>{app.name}</h3>
              <p className="muted">{app.desc}</p>

              <div className="app-actions">
                {isEnabled && to ? (
                  // Usá Link con la misma clase de botón para mantener estilo
                  <Link className="btn-primary" to={to}>
                    Entrar
                  </Link>
                ) : (
                  <button type="button" className="btn-primary">
                    Entrar
                  </button>
                )}
                <button type="button" className="btn-ghost">Configurar</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  


        {/* Últimos movimientos */}
        <section className="section">
          <div className="section-head">
            <h2>Últimos movimientos</h2>
            <span className="muted">Se mostrarán aquí cuando tengas actividad</span>
          </div>
          <div className="card table">
            <div className="empty">
              <p className="muted">Sin datos todavía.</p>
              <small className="muted">Cuando empieces a usar las apps, verás tus movimientos acá.</small>
            </div>
          </div>
        </section>

        {/* Actividad reciente */}
        <section className="section">
          <div className="section-head">
            <h2>Actividad reciente</h2>
          </div>
          <div className="card list">
            <ul>
              <li className="muted">No hay actividad por ahora.</li>
            </ul>
          </div>
        </section>

        <footer className="footer muted">
          © 2025 Nodum — Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
}
