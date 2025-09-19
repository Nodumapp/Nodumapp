import React from "react";
import { useAgenda } from "../store";


export default function Dashboard(){
const { state } = useAgenda();
const upcoming = React.useMemo(()=>
[...state.appointments]
.filter(a=> new Date(a.start) > new Date())
.sort((a,b)=> new Date(a.start) - new Date(b.start))
.slice(0,5)
,[state.appointments]);


return (
<section className="cards">
<div className="card span-4">
<div className="kpi"><div className="label">Próximos turnos</div><div className="value">{upcoming.length}</div></div>
</div>
<div className="card span-4">
<div className="kpi"><div className="label">Clientes</div><div className="value">{state.clients.length}</div></div>
</div>
<div className="card span-4">
<div className="kpi"><div className="label">Servicios</div><div className="value">{state.services.length}</div></div>
</div>


<div className="card span-12 mt-3">
<div className="kpi"><div className="label">Próximos turnos</div></div>
<div className="list">
{upcoming.length === 0 && <div className="item text-muted">No hay próximos turnos</div>}
{upcoming.map((a)=>{
const start = new Date(a.start);
const date = start.toLocaleDateString(undefined,{weekday:'short', day:'2-digit', month:'short'})
const time = start.toLocaleTimeString(undefined,{hour:'2-digit', minute:'2-digit'})
return (
<div key={a.id} className="item">
<div className="when"><span className="badge">{date} {time}</span> {a.notes || 'Sin notas'}</div>
<div className="text-muted small">{a.status}</div>
</div>
)
})}
</div>
</div>
</section>
);
}