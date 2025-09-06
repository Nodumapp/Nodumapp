import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;
const JWT_SECRET = "dev-secret"; // solo para pruebas

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// “Base de datos” en memoria (se borra al reiniciar)
const users = []; // { id, firstName, lastName, email, passwordHash (PLAIN para mock) }

// Helpers
function createToken(user) {
  // payload mínimo para probar front
  return jwt.sign(
    { sub: user.id, email: user.email, name: `${user.firstName} ${user.lastName}` },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// Endpoints
app.post("/auth/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body || {};
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Faltan campos" });
  }
  const exists = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (exists) return res.status(409).json({ message: "El email ya existe" });

  const user = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    passwordHash: password // en mock lo dejamos plano
  };
  users.push(user);
  return res.status(201).json({ id: user.id, email: user.email });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  const accessToken = createToken(user);
  // opcional: refreshToken mock
  const refreshToken = "mock-refresh-" + user.id;

  return res.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
});

// Recurso protegido para probar token (opcional)
app.get("/me", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Sin token" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return res.json({ ok: true, payload });
  } catch {
    return res.status(401).json({ message: "Token inválido/expirado" });
  }
});

app.listen(PORT, () => {
  console.log(`Mock API escuchando en http://localhost:${PORT}`);
});
