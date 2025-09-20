// src/agenda/components/ClientInfoModal.jsx
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

export default function ClientInfoModal({ open, onClose, client }) {
  if (!client) return null;
  return (
    <Modal open={open} onClose={onClose} title="Información del cliente">
      <div className="row g-2">
        <div className="col-md-6"><strong>Nombre:</strong> {client.firstName || "-"}</div>
        <div className="col-md-6"><strong>Apellido:</strong> {client.lastName || "-"}</div>
        <div className="col-md-6"><strong>DNI:</strong> {client.dni || "-"}</div>
        <div className="col-md-6"><strong>CUIT:</strong> {client.cuit || "-"}</div>
        <div className="col-12"><strong>Dirección:</strong> {client.address || "-"}</div>
        <div className="col-md-6"><strong>Email:</strong> {client.email || "-"}</div>
        <div className="col-md-6"><strong>Teléfono:</strong> {client.phone || "-"}</div>
      </div>
    </Modal>
  );
}
