import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css"; // CSS global (no module)
import styles from "../styles/Login.module.css";
import { authRegister, authLogin } from "../services/authService";
import Login from "./Login";
import Panel from "./Panel";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    remember: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill email si el usuario eligió “Recordar”
  useEffect(() => {
    const remembered = localStorage.getItem("rememberEmail");
    if (remembered) {
      setForm((f) => ({ ...f, email: remembered, remember: true }));
    }
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // 1) Registrar
      await authRegister({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      // 2) Loguear automáticamente
      const data = await authLogin(form.email, form.password);
      const { accessToken, refreshToken, user } = data || {};

      if (!accessToken) throw new Error("No se recibió el token de acceso.");

      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      if (form.remember) {
        localStorage.setItem("rememberEmail", form.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      navigate("/Panel"); // redirigí a donde quieras
    } catch (err) {
      const msg = err?.message || "Error registrando usuario";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrap">
      <div className="register-left">
        <header className="register-header">
          <Link to="/" aria-label="Ir al inicio">
           <img src={process.env.PUBLIC_URL + "/images/Nodum-Logo-solo-color-sin-slogan.png"} alt="Nodum" className="register-logo" />
          </Link>
        </header>

        <main className="register-main">
          <h1 className="register-title">Completa tu registro</h1>
          <p className="register-subtitle">
            Completa tu información y desbloquea todas las funcionalidades.
          </p>

          {error && <div className="register-error">{error}</div>}

          <form className="register-form" onSubmit={onSubmit} noValidate>
            <label className="register-label" htmlFor="firstName">Nombre</label>
            <input
              id="firstName"
              name="firstName"
              className="register-input"
              type="text"
              placeholder="Tu nombre"
              value={form.firstName}
              onChange={onChange}
              required
              autoComplete="given-name"
            />

            <label className="register-label" htmlFor="lastName">Apellido</label>
            <input
              id="lastName"
              name="lastName"
              className="register-input"
              type="text"
              placeholder="Tu apellido"
              value={form.lastName}
              onChange={onChange}
              required
              autoComplete="family-name"
            />

            <label className="register-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              className="register-input"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={onChange}
              required
              autoComplete="email"
            />

            <label className="register-label" htmlFor="password">Contraseña</label>
            <div className="register-passWrap">
              <input
                id="password"
                name="password"
                className="register-input"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                required
                autoComplete="new-password"
                minLength={6}
              />
              
              <button
                type="button"
                className="register-eyeBtn"
                aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPass((v) => !v)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </button>
            </div>

            <div className="register-rowActions">
              <label className="register-check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={onChange}
                />{" "}
                Recordar usuario
              </label>

              {/* Cambiá la ruta si tenés vista de recuperación */}
              <Link to="/forgot" className="register-link">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className={styles.socialRow}>
              <button type="button" className={styles.socialBtn} onClick={() => alert("Implementar OAuth Google en backend")}>
                {/* Google */}
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="#FFC107" d="M21.35 11.1H12v2.9h5.33A5.65 5.65 0 0 1 6.35 16a6 6 0 1 0 5.65 8c3.23 0 5.87-2.64 5.87-5.87 0-.4-.04-.79-.12-1.17Z" />
                  <path fill="#FF3D00" d="M3.35 7.9l2.38 1.74A6 6 0 0 1 12 6.13c1.55 0 2.95.55 4.05 1.47L18.7 5C16.97 3.48 14.63 2.6 12 2.6A9.4 9.4 0 0 0 3.35 7.9Z" />
                  <path fill="#4CAF50" d="M12 21.4c2.6 0 4.9-.86 6.63-2.33l-2.66-2.06A6 6 0 0 1 6.35 16l-2.4 1.84A9.4 9.4 0 0 0 12 21.4Z" />
                  <path fill="#1976D2" d="M21.35 11.1H12v2.9h5.33c-.26 1.6-.99 2.94-2.04 3.93l2.66 2.06c1.56-1.44 2.55-3.56 2.55-6.13 0-.63-.06-1.24-.15-1.76Z" />
                </svg>
                Google
              </button>

              <button type="button" className={styles.socialBtn} onClick={() => alert("Implementar OAuth Facebook en backend")}>
                {/* Facebook */}
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="#1877F2" d="M22.675 0H1.325C.593 0 0 .593 0 1.325V22.68C0 23.41.593 24 1.325 24h11.5V14.708H9.691v-3.6h3.134V8.413c0-3.1 1.893-4.79 4.658-4.79 1.323 0 2.46.098 2.79.142v3.24l-1.915.001c-1.5 0-1.792.715-1.792 1.763v2.31h3.584l-.467 3.6h-3.117V24h6.114C23.407 24 24 23.41 24 22.678V1.322C24 .593 23.407 0 22.675 0Z" />
                </svg>
                Facebook
              </button>
            </div>
         <button
              type="submit"
              className="register-primaryBtn"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
            <p className={styles.bottomNote}>
              ¿ya tenés cuenta?{" "}
              <Link to="/Login" className={styles.link}>Inicia Sesion</Link>
            </p>
          </form>
        </main>
      </div>

      {/* Columna derecha */}
      <aside className={styles.right}>
        <div className={styles.hero}>
          <img
            src={process.env.PUBLIC_URL + "/images/chamfjord-muUX3rENBX0-unsplash.jpg"}
            alt="Fondo"
          />
          <div className={styles.overlay}>
            <h2 className={styles.bigline}>
              <span className={styles.bold}><span className={styles.kicker}>Un</span> ecosistema</span><br />
              de soluciones,<br />
              <span className={styles.bold}>activables</span> según<br />
              tu necesidad.
            </h2>
          </div>
        </div>
      </aside>
    </div>
  );
}
