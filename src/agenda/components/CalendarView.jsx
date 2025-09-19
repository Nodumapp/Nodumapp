import React, { useMemo, useCallback } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAgenda } from "../store";


const locales = { es, "es-AR": es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek: (date)=> startOfWeek(date, { weekStartsOn: 1 }), getDay, locales });


function buildTitle(a, clients, services, staff){
const c = clients.find((x)=> x.id===a.clientId);
const s = services.find((x)=> x.id===a.serviceId);
const t = staff.find((x)=> x.id===a.staffId);
return `${s?.name||"Servicio"} - ${c? `${c.firstName} ${c.lastName||""}`.trim() : "Sin cliente"} (${t?.name||"Staff"})`;
}


export default function CalendarView({ onSelectEvent, onSelectSlot }){
const { state } = useAgenda();
const { appointments, services, clients, staff } = state;


const events = useMemo(()=> appointments.map((a)=> ({
id: a.id,
title: buildTitle(a, clients, services, staff),
start: new Date(a.start),
end: new Date(a.end),
resource: a,
})), [appointments, clients, services, staff]);


const eventPropGetter = useCallback((event)=>{
const svc = services.find((s)=> s.id === event.resource.serviceId);
return { style: { backgroundColor: svc?.color || "#2563eb", border: "none", color: "#fff" } };
}, [services]);


return (
<Calendar
localizer={localizer}
events={events}
defaultView={Views.WEEK}
views={[Views.DAY, Views.WEEK, Views.MONTH]}
selectable
onSelectEvent={onSelectEvent}
onSelectSlot={onSelectSlot}
eventPropGetter={eventPropGetter}
style={{ height: "70vh" }}
/>
);
}