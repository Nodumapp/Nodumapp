import React from "react";

function Modal({ open, title, onClose, children }) {
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
        <div className="ndm-modal__footer">
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default function StaffInfoModal({ open, onClose, staff }) {
  if (!staff) return null;
  return (
    <Modal open={open} onClose={onClose} title="Información del staff">
      <div className="row g-2">
        <div className="col-md-6"><strong>Nombre:</strong> {staff.name || "-"}</div>
        <div className="col-md-6"><strong>Rol:</strong> {staff.role || "-"}</div>
        <div className="col-md-6"><strong>Email:</strong> {staff.email || "-"}</div>
        <div className="col-md-6"><strong>Teléfono:</strong> {staff.phone || "-"}</div>
      </div>
    </Modal>
  );
}
