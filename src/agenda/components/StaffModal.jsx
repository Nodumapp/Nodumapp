import React, { useEffect, useState } from "react";

/* Modal base (usa tus clases ndm-modal) */
function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="ndm-modal" role="dialog" aria-modal="true">
      <div className="ndm-modal__backdrop" onClick={onClose} />
      <div className="ndm-modal__dialog">
        <div className="ndm-modal__header">
          <h5 className="m-0">{title}</h5>
          <button className="btn" onClick={onClose}>×</button>
        </div>
        <div className="ndm-modal__body">{children}</div>
        <div className="ndm-modal__footer">{footer}</div>
      </div>
    </div>
  );
}

export default function StaffModal({
  open,
  onClose,
  onSave,
  initialData = null,                 // null para evitar resets mientras se tipea
  title = "Nuevo miembro del staff",
}) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", dni: "", cuit: "",
    address: "", email: "", phone: "", role: "",
  });

  // Rehidratar solo al abrir y si cambia la entidad (id)
  useEffect(() => {
    if (!open) return;
    if (initialData && (initialData.id || initialData.firstName || initialData.name)) {
      // compat: si viene "name", intentar partirlo
      const [fn = "", ...rest] = (initialData.name || "").trim().split(/\s+/);
      const ln = (initialData.lastName ?? rest.join(" ")).trim();
      setForm({
        firstName: initialData.firstName ?? fn ?? "",
        lastName:  ln ?? "",
        dni:       initialData.dni ?? "",
        cuit:      initialData.cuit ?? "",
        address:   initialData.address ?? "",
        email:     initialData.email ?? "",
        phone:     initialData.phone ?? "",
        role:      initialData.role ?? "",
      });
    } else {
      setForm({
        firstName: "", lastName: "", dni: "", cuit: "",
        address: "", email: "", phone: "", role: "",
      });
    }
  }, [open, initialData?.id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validName = form.firstName.trim().length > 0;
  const validEmail = !form.email || /\S+@\S+\.\S+/.test(form.email);
  const canSave = validName && validEmail;

  const handleSave = () => {
    if (!canSave) return;
    onSave?.({
      firstName: form.firstName.trim(),
      lastName:  form.lastName.trim(),
      dni:       form.dni.trim(),
      cuit:      form.cuit.trim(),
      address:   form.address.trim(),
      email:     form.email.trim(),
      phone:     form.phone.trim(),
      role:      form.role.trim(),
      // compat: muchos lugares usan "name"
      name: `${form.firstName} ${form.lastName}`.trim(),
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
          <button className={`btn primary${canSave ? "" : " disabled"}`} disabled={!canSave} onClick={handleSave}>
            Guardar
          </button>
        </>
      }
    >
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre *</label>
          <input className="form-control" value={form.firstName} onChange={(e)=>set("firstName", e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Apellido</label>
          <input className="form-control" value={form.lastName} onChange={(e)=>set("lastName", e.target.value)} />
        </div>

        <div className="col-md-6">
          <label className="form-label">DNI</label>
          <input className="form-control" inputMode="numeric" value={form.dni} onChange={(e)=>set("dni", e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">CUIT</label>
          <input className="form-control" inputMode="numeric" value={form.cuit} onChange={(e)=>set("cuit", e.target.value)} />
        </div>

        <div className="col-12">
          <label className="form-label">Dirección</label>
          <input className="form-control" value={form.address} onChange={(e)=>set("address", e.target.value)} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input className={`form-control${validEmail ? "" : " is-invalid"}`} value={form.email} onChange={(e)=>set("email", e.target.value)} />
          {!validEmail && <div className="invalid-feedback">Email inválido</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input className="form-control" value={form.phone} onChange={(e)=>set("phone", e.target.value)} />
        </div>

        <div className="col-12">
          <label className="form-label">Rol / Puesto</label>
          <input className="form-control" value={form.role} onChange={(e)=>set("role", e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}
