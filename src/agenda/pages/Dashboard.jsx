import React from "react";
import { useAgenda } from "../store";


export default function Dashboard() {
const { appointments, clients, services } = useAgenda();
const upcoming = appointments
.filter(a => new Date(a.start) >= new Date())
.sort((a,b) => new Date(a.start) - new Date(b.start))
.slice(0,5);


return (
<div>
<h5 className="mb-3">Resumen</h5>
<div className="row g-3">
<div className="col-md-3">
<div className="card p-3">
<div className="text-muted">Próximos turnos</div>
<div className="h3 mb-0">{upcoming.length}</div>
</div>
</div>
<div className="col-md-3">
<div className="card p-3">
<div className="text-muted">Clientes</div>
<div className="h3 mb-0">{clients.length}</div>
</div>
</div>
<div className="col-md-3">
<div className="card p-3">
<div className="text-muted">Servicios</div>
<div className="h3 mb-0">{services.length}</div>
</div>
</div>
</div>


<div className="card p-3 mt-4">
<h6>Próximos turnos</h6>
<ul className="list-group list-group-flush">
{upcoming.length === 0 && <li className="list-group-item text-muted">No hay turnos próximos</li>}
{upcoming.map(a => (
<li key={a.id} className="list-group-item">
{new Date(a.start).toLocaleString()} — {a.title || 'Turno'} ({a.status})
</li>
))}
</ul>
</div>
</div>
);
}