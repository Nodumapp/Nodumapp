import React from "react";
export default function Select({ label, value, onChange, options, valueKey='id', labelKey='name', name, className }){
return (
<div className={className || "mb-3"}>
{label && <label className="form-label">{label}</label>}
<select name={name} value={value || ''} onChange={e => onChange(e.target.value)} className="form-select">
<option value="">Seleccionar…</option>
{options.map(opt => (<option key={opt[valueKey]} value={opt[valueKey]}>{opt[labelKey]}</option>))}
</select>
</div>
);
}