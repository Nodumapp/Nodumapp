import React, { useEffect, useMemo, useState } from "react";

const LS_KEY = "agenda:staff";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const BLANK = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "Operativo", // ejemplo
  color: "#2563eb",
  active: true,
};

export default function Staff() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [mode, setMode] = useState(null); // "new" | "edit" | null
  const [form, setForm] = useState(BLANK);

  // cargar desde localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {
      /* noop */
    }
  }, []);

  // persistir en localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.firstName} ${i.lastName} ${i.email} ${i.role}`
        .toLowerCase()
        .includes(q)
    );
  }, [items, filter]);

  function startNew() {
    setForm({ ...BLANK, id: uid() });
    setMode("new");
  }

  function startEdit(id) {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    setForm({ ...it });
    setMode("edit");
  }

  function cancel() {
    setMode(null);
    setForm(BLANK);
  }

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function save(e) {
    e.preventDefault();
    if (!form.firstName || !form.email) {
      alert("Nombre y email son obligatorios");
      return;
    }
    if (mode === "new") {
      setItems((prev) => [...prev, form]);
    } else if (mode === "edit") {
      setItems((prev) => prev.map((x) => (x.id === form.id ? form : x)));
    }
    cancel();
  }

  function remove(id) {
    if (window.confirm("¿Eliminar este miembro del staff?")) {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }
  }

  return (
    <div className="section">
      <div className="section-head">
        <h2>Staff</h2>
        <span className="muted">Gestioná tu equipo y sus datos básicos</span>
      </div>

      {/* Filtros / Acciones */}
      <div className="card p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Buscar por nombre, email o rol…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="col-md-6 text-md-end">
            <button type="button" className="btn-primary" onClick={startNew}>
              Agregar miembro
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="card table">
        {filtered.length === 0 ? (
          <div className="empty">
            <p className="muted">No hay miembros en el staff.</p>
            <small className="muted">
              Usá “Agregar miembro” para crear uno nuevo.
            </small>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{ width: 40 }}></th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((it) => (
                  <tr key={it.id}>
                    <td>
                      <span
                        title={it.color}
                        style={{
                          display: "inline-block",
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          background: it.color || "#999",
                          border: "1px solid #ddd",
                        }}
                      />
                    </td>
                    <td>
                      <strong>
                        {it.firstName} {it.lastName}
                      </strong>
                    </td>
                    <td>{it.role}</td>
                    <td className="text-break">{it.email}</td>
                    <td>{it.phone || "-"}</td>
                    <td>
                      {it.active ? (
                        <span className="badge bg-success">Activo</span>
                      ) : (
                        <span className="badge bg-secondary">Inactivo</span>
                      )}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn-ghost me-2"
                        onClick={() => startEdit(it.id)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => remove(it.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* “Modal” simple inline (sin dependencias) */}
      {mode && (
        <div className="card p-3 mt-3">
          <h5 className="mb-3">
            {mode === "new" ? "Nuevo miembro" : "Editar miembro"}
          </h5>
          <form onSubmit={save} className="row g-3" noValidate>
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                value={form.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Apellido</label>
              <input
                className="form-control"
                value={form.lastName}
                onChange={(e) => setField("lastName", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Rol</label>
              <input
                className="form-control"
                value={form.role}
                onChange={(e) => setField("role", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Teléfono</label>
              <input
                className="form-control"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Color</label>
              <input
                type="color"
                className="form-control form-control-color"
                value={form.color}
                onChange={(e) => setField("color", e.target.value)}
                title="Elegir color"
              />
            </div>

            <div className="col-12 form-check">
              <input
                id="st-active"
                type="checkbox"
                className="form-check-input"
                checked={!!form.active}
                onChange={(e) => setField("active", e.target.checked)}
              />
              <label htmlFor="st-active" className="form-check-label">
                Activo
              </label>
            </div>

            <div className="col-12">
              <button type="submit" className="btn-primary">
                Guardar
              </button>
              <button
                type="button"
                className="btn-ghost ms-2"
                onClick={cancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
