import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
import styles from "../styles/Forgot.module.css";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const token = sp.get("token") || "";
  const nav = useNavigate();

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    if (pass1.length < 6) return setErr("La contraseña debe tener al menos 6 caracteres.");
    if (pass1 !== pass2) return setErr("Las contraseñas no coinciden.");
    setLoading(true);
    try {
      await resetPassword(token, pass1);
      setMsg("¡Listo! Tu contraseña fue actualizada.");
      setTimeout(() => nav("/login"), 1200);
    } catch (e) {
      setErr(e.message || "No se pudo restablecer la contraseña.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <header className={styles.header}>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/Nodum Logo solo color sin slogan"}
              alt="Nodum"
              className={styles.logo}
            />
          </Link>
        </header>

        <main className={styles.main}>
          <h1 className={styles.title}>Crear nueva contraseña</h1>
          <p className={styles.subtitle}>Ingresá tu nueva contraseña.</p>

          {err && <div className={styles.error}>{err}</div>}
          {msg && <div className={styles.success}>{msg}</div>}

          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label} htmlFor="p1">Nueva contraseña</label>
            <input id="p1" type="password" className={styles.input}
                   value={pass1} onChange={e => setPass1(e.target.value)} minLength={6} required />

            <label className={styles.label} htmlFor="p2">Repetir contraseña</label>
            <input id="p2" type="password" className={styles.input}
                   value={pass2} onChange={e => setPass2(e.target.value)} minLength={6} required />

            <button className={styles.primaryBtn} type="submit" disabled={loading || !token}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </form>

          <p className={styles.backLink}><Link to="/login">Volver a iniciar sesión</Link></p>
        </main>
      </div>

      <aside className={styles.right}>
        <div className={styles.hero}>
          <img src={process.env.PUBLIC_URL + "/images/chamfjord-muUX3rENBX0-unsplash.jpg"} alt="Fondo" />
          <div className={styles.overlay}></div>
        </div>
      </aside>
    </div>
  );
}
