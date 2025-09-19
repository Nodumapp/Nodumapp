import React from "react";
import { useAgenda } from "../store";
import CalendarView from "../components/CalendarView";
import AppointmentModal from "../components/AppointmentModal";


export default function CalendarPage(){
const { state, add, update, remove } = useAgenda();
const [open, setOpen] = React.useState(false);
const [editing, setEditing] = React.useState(null);


const handleSelectEvent = (ev) => { setEditing(ev.resource); setOpen(true); };
const handleSelectSlot = ({ start, end }) => { setEditing({ start, end }); setOpen(true); };


function handleSave(payload){
if (editing?.id){ update('appointments', editing.id, payload); }
else { add('appointments', payload); }
setOpen(false); setEditing(null);
}
function handleClose(){ setOpen(false); setEditing(null); }


return (
<section className="grid">
<div className="card span-12">
<div className="kpi"><div className="label">Calendario</div></div>
<CalendarView onSelectEvent={handleSelectEvent} onSelectSlot={handleSelectSlot} />
</div>


<AppointmentModal
open={open}
onClose={handleClose}
onSave={handleSave}
initialData={editing||{}}
clients={state.clients}
staff={state.staff}
services={state.services}
title={editing?.id? 'Editar cita':'Nueva cita'}
/>
</section>
);
}