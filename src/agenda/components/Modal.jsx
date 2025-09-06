import React from "react";


export default function Modal({ open, title, onClose, children, footer }) {
if (!open) return null;
return (
<div className="ndm-modal" role="dialog" aria-modal="true">
<div className="ndm-modal__backdrop" onClick={onClose} />
<div className="ndm-modal__dialog">
<div className="ndm-modal__header">
<h5 className="m-0">{title}</h5>
<button className="btn btn-sm btn-outline-secondary" onClick={onClose}>×</button>
</div>
<div className="ndm-modal__body">{children}</div>
{footer && <div className="ndm-modal__footer">{footer}</div>}
</div>
</div>
);
}