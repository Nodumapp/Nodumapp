import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/authService";
import styles from "../styles/Forgot.module.css"; // ver abajo

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [devLink, setDevLink] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg(""); setDevLink("");
    setLoading(true);
    try {
      const res = await requestPasswordReset(email.trim());
      setMsg("Si el correo existe, te enviamos instrucciones para recuperar tu contraseña.");
      if (res?.resetUrl) setDevLink(res.resetUrl); // útil en perfil dev
    } catch (e) {
      // igual mostramos mensaje neutral (evita enumeración de emails)
      setMsg("Si el correo existe, te enviamos instrucciones para recuperar tu contraseña.");
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
          <h1 className={styles.title}>Olvide mi contraseña</h1>
          <p className={styles.subtitle}>
            Ingresá tu email, te enviaremos un correo para que recuperes tu contraseña.
          </p>

          {err && <div className={styles.error}>{err}</div>}
          {msg && <div className={styles.success}>{msg}</div>}
          {devLink && (
            <div className={styles.devBox}>
              <div>DEV: enlace de reseteo</div>
              <a href={devLink}>{devLink}</a>
            </div>
          )}

          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email" type="email" required autoComplete="email"
              className={styles.input}
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
            <button className={styles.primaryBtn} type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>

          <p className={styles.backLink}>
            <Link to="/login">Volver a iniciar sesión</Link>
          </p>
        </main>
      </div>

      <aside className={styles.right}>
        <div className={styles.hero}>
          <img src={process.env.PUBLIC_URL + "/images/chamfjord-muUX3rENBX0-unsplash.jpg"} alt="Fondo" />
          <div className={styles.overlay}>
            <h2 className={styles.bigline}>
              <span className={styles.bold}>Un <span className={styles.kicker}>ecosistema</span></span><br />
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
