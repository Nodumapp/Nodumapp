import React, { useEffect, useMemo, useState } from "react";

/* Util: datetime-local */
function fmt(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

/* Modal sin dependencias (usa clases .ndm-modal) */
function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="ndm-modal" role="dialog" aria-modal="true">
      <div className="ndm-modal__backdrop" onClick={onClose} />
      <div className="ndm-modal__dialog" style={{ zIndex: 1060 }}>
        <div className="ndm-modal__header">
          <h5 className="m-0">{title}</h5>
          <button className="btn" onClick={onClose}>×</button>
        </div>
        <div className="ndm-modal__body">{children}</div>
        <div className="ndm-modal__footer">
          {footer ?? <button className="btn" onClick={onClose}>Cerrar</button>}
        </div>
      </div>
    </div>
  );
}

/* Select simple */
function Select({ label, value, onChange, options = [], placeholder = "Seleccionar..." }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <select className="form-select" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value ?? o.id} value={o.value ?? o.id}>{o.label ?? o.name}</option>
        ))}
      </select>
    </div>
  );
}

export default function AppointmentModal({
  open,
  onClose,
  onSave,
  initialData = {},
  clients = [],
  staff = [],
  services = [],
  title = "Nueva cita",
}) {
  const norm = (arr) =>
    (arr || []).map((x) => {
      const full = `${x.firstName ?? ""} ${x.lastName ?? ""}`.trim();
      const label = x.label ?? x.name ?? (full || x.email || "Sin nombre");
      return { value: x.value ?? x.id ?? x._id, label, _raw: x };
    });

  const clientOpts = useMemo(() => norm(clients), [clients]);
  const staffOpts = useMemo(() => norm(staff), [staff]);
  const serviceOpts = useMemo(() => norm(services), [services]);

  const [form, setForm] = useState(() => ({
    clientId: initialData.clientId ?? "",
    staffId: initialData.staffId ?? "",
    serviceId: initialData.serviceId ?? "",
    status: initialData.status ?? "booked",
    startStr: fmt(initialData.start ?? new Date()),
    endStr: fmt(initialData.end ?? new Date(Date.now() + 60 * 60 * 1000)),
    notes: initialData.notes ?? "",
    reminders: { email: !!initialData?.reminders?.email, sms: !!initialData?.reminders?.sms },
  }));

  // rehidratar cuando se abre con otra cita
  useEffect(() => {
    if (!open) return;
    setForm({
      clientId: initialData.clientId ?? "",
      staffId: initialData.staffId ?? "",
      serviceId: initialData.serviceId ?? "",
      status: initialData.status ?? "booked",
      startStr: fmt(initialData.start ?? new Date()),
      endStr: fmt(initialData.end ?? new Date(Date.now() + 60 * 60 * 1000)),
      notes: initialData.notes ?? "",
      reminders: { email: !!initialData?.reminders?.email, sms: !!initialData?.reminders?.sms },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialData?.id]);

  useEffect(() => {
    const svc = serviceOpts.find((s) => String(s.value) === String(form.serviceId))?._raw;
    if (!svc || !svc.durationMinutes || !form.startStr) return;
    const start = new Date(form.startStr);
    const end = new Date(start.getTime() + svc.durationMinutes * 60000);
    setForm((f) => ({ ...f, endStr: fmt(end) }));
  }, [form.serviceId, form.startStr, serviceOpts]);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canSave =
    form.clientId && form.staffId && form.serviceId &&
    form.startStr && form.endStr &&
    new Date(form.endStr) > new Date(form.startStr);

  const save = () => {
    if (!canSave) return;
    onSave?.({
      clientId: form.clientId,
      staffId: form.staffId,
      serviceId: form.serviceId,
      status: form.status,
      start: new Date(form.startStr),
      end: new Date(form.endStr),
      notes: form.notes?.trim() || "",
      reminders: { email: !!form.reminders?.email, sms: !!form.reminders?.sms },
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className={`btn primary${canSave ? "" : " disabled"}`} disabled={!canSave} onClick={save}>
            Guardar
          </button>
        </>
      }
    >
      <div className="row g-3">
        <div className="col-md-6">
          <Select label="Cliente" value={form.clientId} onChange={(v) => setField("clientId", v)} options={clientOpts} />
        </div>
        <div className="col-md-6">
          <Select label="Staff" value={form.staffId} onChange={(v) => setField("staffId", v)} options={staffOpts} />
        </div>
        <div className="col-md-6">
          <Select label="Servicio" value={form.serviceId} onChange={(v) => setField("serviceId", v)} options={serviceOpts} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <select className="form-select" value={form.status} onChange={(e) => setField("status", e.target.value)}>
            <option value="booked">Reservado</option>
            <option value="confirmed">Confirmado</option>
            <option value="cancelled">Cancelado</option>
            <option value="no-show">No asistió</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Inicio</label>
          <input type="datetime-local" className="form-control" value={form.startStr} onChange={(e) => setField("startStr", e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Fin</label>
          <input type="datetime-local" className="form-control" value={form.endStr} onChange={(e) => setField("endStr", e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Notas</label>
          <textarea className="form-control" rows={3} value={form.notes || ""} onChange={(e) => setField("notes", e.target.value)} />
        </div>
        <div className="col-12 form-check">
          <input id="remEmail" className="form-check-input" type="checkbox" checked={!!form.reminders?.email}
                 onChange={(e) => setField("reminders", { ...form.reminders, email: e.target.checked })}/>
          <label htmlFor="remEmail" className="form-check-label">Recordatorio por email</label>
        </div>
        <div className="col-12 form-check">
          <input id="remSms" className="form-check-input" type="checkbox" checked={!!form.reminders?.sms}
                 onChange={(e) => setField("reminders", { ...form.reminders, sms: e.target.checked })}/>
          <label htmlFor="remSms" className="form-check-label">Recordatorio por SMS</label>
        </div>
      </div>
    </Modal>
  );
}
