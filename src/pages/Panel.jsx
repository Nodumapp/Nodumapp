import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Panel.css";

export default function Panel() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: IconGrid, to: "/panel" },
    { key: "customer", label: "Clientes", icon: IconUsers, to: "/clientes" },
    { key: "products", label: "Productos/Servicios", icon: IconBox, to: "/productos" },
    { key: "accounts", label: "Cuentas", icon: IconWallet, to: "/cuentas" },
    { key: "reports", label: "Reportes", icon: IconChart, to: "/reportes" },
    { key: "setup", label: "Configuración", icon: IconSettings, to: "/config" },
  ];

  // Cards de acceso rápido a apps Nodum
  const appCards = [
    { title: "Agenda", desc: "Reuniones y recordatorios", icon: IconCalendar, to: "/agenda", tint: "teal" },
    { title: "ERP / Gestión", desc: "Procesos y recursos", icon: IconCpu, to: "/erp", tint: "indigo" },
    { title: "Tienda Online", desc: "Ventas y catálogo", icon: IconStore, to: "/tienda", tint: "purple" },
    { title: "Analytics", desc: "Métricas y tableros", icon: IconAnalytics, to: "/analytics", tint: "blue" },
    { title: "Facturación", desc: "Comprobantes y pagos", icon: IconInvoice, to: "/facturacion", tint: "cyan" },
    { title: "Usuarios", desc: "Roles y permisos", icon: IconUserShield, to: "/usuarios", tint: "green" },
  ];

  return (
    <div className={`panel ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar" aria-label="Barra lateral">
        <div className="brand">
          <button
            className="collapseBtn"
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
            onClick={() => setCollapsed(v => !v)}
            title={collapsed ? "Expandir" : "Colapsar"}
          >
            <IconMenu />
          </button>

          <Link to="/" className="brandLink">
            <BrandMark />
            <img src="/images/Nodum Logo solo color sin slogan.png" alt="" />
          </Link>
        </div>

        <nav className="nav">
          {navItems.map(({ key, label, icon: Icon, to }) => {
            const active = pathname === to;
            return (
              <Link key={key} to={to} className={`navItem ${active ? "active" : ""}`}>
                <Icon />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebarFooter">
          <div className="upgradeCard">
            <div className="crown">👑</div>
            <div className="upText">
              <strong>Upgrade a PRO</strong>
              <small>Más control y soporte</small>
            </div>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Nodum
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="topbar">
          <div className="tabs">
            <button className="chip selected">Product/Services</button>
            <button className="chip">Customers</button>
          </div>

          <div className="actions">
            <button className="badge">Premium</button>
            <button className="iconBtn" title="Notificaciones" aria-label="Notificaciones">
              <IconBell />
            </button>
            <div className="avatar" title="Tu perfil">N</div>
          </div>
        </header>

        {/* Quick stats (decorativas) */}
        <section className="stats">
          <StatCard color="teal"    title="Total facturado"  big="$3.000" small1="Cobrado $3.000" small2="Pendiente $1.500" icon={IconBill} />
          <StatCard color="purple"  title="Usuarios"         big="2.100"  small1="Activos 1.100" small2="Inactivos 560"    icon={IconUsersBadge} />
          <StatCard color="indigo"  title="Pagos"            big="2.110"  small1="Pagos 1.730"   small2="Impagos 380"      icon={IconReceipt} />
          <StatCard color="cyan"    title="Nuevos usuarios"  big="670"    small1="Nuevos 670"    small2="Anteriores 1.150" icon={IconSpark}  />
        </section>

        {/* Apps */}
        <section className="apps">
          {appCards.map(({ title, desc, icon: Icon, to, tint }) => (
            <button key={title} className={`appCard tint-${tint}`} onClick={() => navigate(to)}>
              <div className="appIcon"><Icon /></div>
              <div className="appBody">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <div className="appGo" aria-hidden>→</div>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}

/* ----------------------- Pequeños componentes ----------------------- */

function StatCard({ color, title, big, small1, small2, icon: Icon }) {
  return (
    <div className={`statCard color-${color}`}>
      <div className="statIcon"><Icon /></div>
      <div className="statContent">
        <div className="statTitle">{title}</div>
        <div className="statBig">{big}</div>
        <div className="statRow">
          <span>{small1}</span>
          <span>{small2}</span>
        </div>
      </div>
    </div>
  );
}

function BrandMark() {
  // cuadrado verde con dos nodos (mini-isotipo)
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="3" fill="var(--nodum)" />
      <circle cx="7" cy="16" r="2" fill="#fff" />
      <circle cx="15" cy="8" r="2" fill="#fff" />
      <path d="M7 16 L15 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ----------------------------- Iconos ------------------------------ */
function IconMenu() { return (<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function IconGrid() { return (<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" fill="currentColor"/></svg>); }
function IconUsers() { return (<svg viewBox="0 0 24 24"><path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" fill="currentColor"/><path d="M3 21a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>); }
function IconBox() { return (<svg viewBox="0 0 24 24"><path d="M12 2l9 5-9 5-9-5 9-5z" fill="currentColor"/><path d="M21 7v10l-9 5V12l9-5zM3 7v10l9 5V12L3 7z" opacity=".5" fill="currentColor"/></svg>); }
function IconWallet() { return (<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="17" cy="12" r="1.5" fill="currentColor"/></svg>); }
function IconChart() { return (<svg viewBox="0 0 24 24"><path d="M4 20V6M10 20V10M16 20V4M22 20H2" stroke="currentColor" strokeWidth="2"/></svg>); }
function IconSettings() { return (<svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="currentColor"/><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1A2 2 0 1 1 7.6 4l.1.1a1 1 0 0 0 1.1.2h.2A1 1 0 0 0 9.6 4V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9h.2a1 1 0 0 0 1.1-.2l.1-.1A2 2 0 1 1 20 7.6l-.1.1a1 1 0 0 0-.2 1.1v.2a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>); }
function IconBell() { return (<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>); }

function IconCalendar() { return (<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/><circle cx="8.5" cy="14.5" r="1.5" fill="currentColor"/><circle cx="12" cy="14.5" r="1.5" fill="currentColor"/></svg>); }
function IconCpu() { return (<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><rect x="9" y="9" width="6" height="6" fill="currentColor"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" stroke="currentColor" strokeWidth="2"/></svg>); }
function IconStore() { return (<svg viewBox="0 0 24 24"><path d="M4 9h16l-1-4H5L4 9Z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" stroke="currentColor" strokeWidth="2"/><path d="M9 13h6v7H9z" fill="currentColor"/></svg>); }
function IconAnalytics() { return (<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="2"/></svg>); }
function IconInvoice() { return (<svg viewBox="0 0 24 24"><path d="M6 2h9l3 3v17l-3-2-3 2-3-2-3 2V2z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="2"/></svg>); }
function IconUserShield() { return (<svg viewBox="0 0 24 24"><path d="M12 2l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V5l7-3z" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="10" r="2.8" fill="currentColor"/></svg>); }
function IconBill() { return (<svg viewBox="0 0 24 24"><path d="M6 2h9l3 3v17l-3-2-3 2-3-2-3 2V2z" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="9" r="3" fill="currentColor"/></svg>); }
function IconUsersBadge() { return (<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="3" fill="currentColor"/><circle cx="17" cy="10" r="3" fill="currentColor" opacity=".6"/><path d="M3 20a6 6 0 0 1 12 0M9 20a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="2"/></svg>); }
function IconReceipt() { return (<svg viewBox="0 0 24 24"><path d="M6 2h12v19l-3-2-3 2-3-2-3 2V2z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 7h8M8 11h8M8 15h6" stroke="currentColor" strokeWidth="2"/></svg>); }
function IconSpark() { return (<svg viewBox="0 0 24 24"><path d="M12 2l2.5 5L20 9l-5 2-3 5-2.5-5L4 9l6-2 2-5z" fill="currentColor"/></svg>); }
