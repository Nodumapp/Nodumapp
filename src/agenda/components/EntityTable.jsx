import React, { useState } from "react";


export default function EntityTable({ title, rows = [], columns = [], onAdd, onUpdate, onRemove }){
const [draft, setDraft] = useState({});
const handleChange = (key,val)=> setDraft((d)=> ({...d,[key]:val}));
return (
<div className="p-3">
<h5 className="mb-3">{title}</h5>
<table className="table align-middle">
<thead><tr>{columns.map(c=> <th key={c.key}>{c.label}</th>)}<th style={{width:120}}/></tr></thead>
<tbody>
{rows.length===0? (
<tr><td colSpan={columns.length+1} className="text-muted">Sin registros</td></tr>
) : rows.map((row)=> (
<tr key={row.id}>
{columns.map((c)=> (
<td key={c.key}>
<input className="form-control form-control-sm" value={row[c.key]??""} onChange={(e)=> onUpdate(row.id, {[c.key]: e.target.value})}/>
</td>
))}
<td className="text-end">
<button className="btn btn-sm btn-outline-danger" onClick={()=> onRemove(row.id)}>Eliminar</button>
</td>
</tr>
))}
</tbody>
</table>
<div className="d-flex gap-2">
{columns.map((c)=> (
<input key={c.key} className="form-control form-control-sm" placeholder={c.label} value={draft[c.key]??""} onChange={(e)=> handleChange(c.key, e.target.value)}/>
))}
<button className="btn btn-sm primary" onClick={()=> { onAdd(draft); setDraft({}); }}>Agregar</button>
</div>
</div>
);
}