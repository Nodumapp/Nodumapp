import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css"; // CSS global (no module)
import styles from "../styles/Login.module.css";
import { authRegister, authLogin } from "../services/authService";
import Login from "./Login";
import Panel from "./Panel";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useFacebookSDK from "../hooks/useFacebookSDK";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const GOOGLE_CLIENT_ID = "996268637969-53fkf5i748jlju2c5lakhr2hp2g13dfu.apps.googleusercontent.com";
const FB_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;

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

  const fbReady = useFacebookSDK(FB_APP_ID);

 async function postOAuth(payload) {
  const res = await fetch(`${API_URL}/auth/oauth-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text || "Sin cuerpo"}`);
  }
  const data = await res.json();
  if (!data?.accessToken) throw new Error("Token no recibido del backend");
  localStorage.setItem("accessToken", data.accessToken);
  if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
  navigate("/Panel");
}

// Google (GIS)
async function handleGoogleSuccess(resp) {
  const idToken = resp?.credential;
  if (!idToken) return alert("No llegó el ID token de Google");
  try { await postOAuth({ provider: "google", credential: idToken }); }
  catch (e) { console.error(e); alert("Error con Google"); }
}
  // === GOOGLE === (credential = ID Token)
  async function handleGoogleSuccess(credentialResponse) {
    const idToken = credentialResponse?.credential;
    if (!idToken) return alert("No llegó el ID token de Google");
    try { await postOAuth("google", idToken); }
    catch (e) { console.error(e); alert("Error con Google"); }
  }

  function handleGoogleError() {
    alert("No se pudo completar el login con Google");
  }

  // === FACEBOOK ===
  function handleFacebook() {
    if (!fbReady || !window.FB) return alert("Facebook SDK cargándose…");
    window.FB.login(async (resp) => {
      try {
        if (resp?.authResponse) {
          const { accessToken } = resp.authResponse;
          await postOAuth("facebook", accessToken);
        } else {
          alert("Login de Facebook cancelado");
        }
      } catch (e) {
        console.error(e);
        alert("Error con Facebook");
      }
    }, { scope: "public_profile,email" });
  }


  return (
    <div className="register-wrap">
      <div className="register-left">
        <header className="register-header">
          <Link to="/" aria-label="Ir al inicio">
            <img src={process.env.PUBLIC_URL + "/images/Nodum Logo solo color sin slogan"} alt="Nodum" className="register-logo" />
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
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  locale="es-419"
                />
              </GoogleOAuthProvider>



              <button
                type="button"
                className={styles.socialBtn}
                onClick={handleFacebook}
              >
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
