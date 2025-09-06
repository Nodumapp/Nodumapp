import React, { useEffect, useState } from "react";

const DEFAULTS = {
  businessName: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  slotMinutes: 30,
  weekStart: "monday", // "sunday" o "monday"
  reminders: { email: true, sms: false },
};

export default function Settings() {
  const [form, setForm] = useState(DEFAULTS);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("agenda:settings") || "null");
      if (saved) setForm({ ...DEFAULTS, ...saved });
    } catch {
      /* noop */
    }
  }, []);

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function setReminder(key, val) {
    setForm((f) => ({ ...f, reminders: { ...f.reminders, [key]: val } }));
  }

  function onSave(e) {
    e.preventDefault();
    localStorage.setItem("agenda:settings", JSON.stringify(form));
    alert("Configuración guardada");
  }

  return (
    <div className="section">
      <div className="section-head">
        <h2>Configuración</h2>
        <span className="muted">Preferencias de tu agenda</span>
      </div>

      <form className="card p-3" onSubmit={onSave} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre del negocio</label>
            <input
              className="form-control"
              value={form.businessName}
              onChange={(e) => setField("businessName", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Zona horaria</label>
            <input
              className="form-control"
              value={form.timezone}
              onChange={(e) => setField("timezone", e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Duración de turno (min)</label>
            <input
              type="number"
              min="5"
              step="5"
              className="form-control"
              value={form.slotMinutes}
              onChange={(e) =>
                setField("slotMinutes", Number(e.target.value) || 30)
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Primer día de la semana</label>
            <select
              className="form-select"
              value={form.weekStart}
              onChange={(e) => setField("weekStart", e.target.value)}
            >
              <option value="monday">Lunes</option>
              <option value="sunday">Domingo</option>
            </select>
          </div>

          <div className="col-md-4 d-flex align-items-end">
            <div className="form-check me-4">
              <input
                id="remEmail"
                type="checkbox"
                className="form-check-input"
                checked={!!form.reminders.email}
                onChange={(e) => setReminder("email", e.target.checked)}
              />
              <label htmlFor="remEmail" className="form-check-label">
                Recordatorio por email
              </label>
            </div>

            <div className="form-check">
              <input
                id="remSms"
                type="checkbox"
                className="form-check-input"
                checked={!!form.reminders.sms}
                onChange={(e) => setReminder("sms", e.target.checked)}
              />
              <label htmlFor="remSms" className="form-check-label">
                Recordatorio por SMS
              </label>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <button type="submit" className="btn-primary">Guardar</button>
          <button
            type="button"
            className="btn-ghost ms-2"
            onClick={() => setForm(DEFAULTS)}
          >
            Reiniciar
          </button>
        </div>
      </form>
    </div>
  );
}
