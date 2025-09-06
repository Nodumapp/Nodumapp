import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { authLogin } from "../services/authService";



export default function Login() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill si guardaste el email
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
      // Llama al backend
      const data = await authLogin(form.email, form.password);
      // Ajustá estas claves a lo que devuelva tu backend:
      // supongo { accessToken, refreshToken?, user? }
      const { accessToken, refreshToken, user } = data;

      if (!accessToken) throw new Error("Token no recibido");

      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      // recordar email (opcional)
      if (form.remember) {
        localStorage.setItem("rememberEmail", form.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      // redirigí donde quieras
      navigate("/Panel");
    } catch (err) {
      setError(err?.message || "Error iniciando sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      {/* Columna izquierda */}
      <div className={styles.left}>
        <header className={styles.header}>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/Nodum-Logo-solo-color-sin-slogan (1).png"}
              alt="Nodum"
              className={styles.logo}
            />
          </Link>
        </header>

        <main className={styles.main}>
          <h1 className={styles.title}>¡Bienvenido/a!</h1>
          <p className={styles.subtitle}>
            Ingresa tu email y contraseña para acceder a tu cuenta.
          </p>

          {/* Mensaje de error */}
          {error && <div className={styles.error}>{error}</div>}

          <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="tu@email.com"
              value={form.email}
              onChange={onChange}
              required
              autoComplete="email"
            />

            <label className={styles.label} htmlFor="password">Contraseña</label>
            <div className={styles.passWrap}>
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                className={styles.input}
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                className={styles.eyeBtn}
                onClick={() => setShowPass((v) => !v)}
                title={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" fill="none" stroke="currentColor" strokeWidth="1.7"/>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.7"/>
                </svg>
              </button>
            </div>

            <div className={styles.rowActions}>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={onChange}
                />{" "}
                Recordar usuario
              </label>
              <Link to="#" className={styles.link}>¿Olvidaste tu contraseña?</Link>
            </div>

           <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <div className={styles.divider}>
              <span>o ingresar con</span>
            </div>

            <div className={styles.socialRow}>
              <button type="button" className={styles.socialBtn} onClick={() => alert("Implementar OAuth Google en backend")}>
                {/* Google */}
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="#FFC107" d="M21.35 11.1H12v2.9h5.33A5.65 5.65 0 0 1 6.35 16a6 6 0 1 0 5.65 8c3.23 0 5.87-2.64 5.87-5.87 0-.4-.04-.79-.12-1.17Z"/>
                  <path fill="#FF3D00" d="M3.35 7.9l2.38 1.74A6 6 0 0 1 12 6.13c1.55 0 2.95.55 4.05 1.47L18.7 5C16.97 3.48 14.63 2.6 12 2.6A9.4 9.4 0 0 0 3.35 7.9Z"/>
                  <path fill="#4CAF50" d="M12 21.4c2.6 0 4.9-.86 6.63-2.33l-2.66-2.06A6 6 0 0 1 6.35 16l-2.4 1.84A9.4 9.4 0 0 0 12 21.4Z"/>
                  <path fill="#1976D2" d="M21.35 11.1H12v2.9h5.33c-.26 1.6-.99 2.94-2.04 3.93l2.66 2.06c1.56-1.44 2.55-3.56 2.55-6.13 0-.63-.06-1.24-.15-1.76Z"/>
                </svg>
                Google
              </button>

              <button type="button" className={styles.socialBtn} onClick={() => alert("Implementar OAuth Facebook en backend")}>
                {/* Facebook */}
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="#1877F2" d="M22.675 0H1.325C.593 0 0 .593 0 1.325V22.68C0 23.41.593 24 1.325 24h11.5V14.708H9.691v-3.6h3.134V8.413c0-3.1 1.893-4.79 4.658-4.79 1.323 0 2.46.098 2.79.142v3.24l-1.915.001c-1.5 0-1.792.715-1.792 1.763v2.31h3.584l-.467 3.6h-3.117V24h6.114C23.407 24 24 23.41 24 22.678V1.322C24 .593 23.407 0 22.675 0Z"/>
                </svg>
                Facebook
              </button>
            </div>

            <p className={styles.bottomNote}>
              ¿No tenés cuenta?{" "}
              <Link to="/register" className={styles.link}>Registrate</Link>
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
