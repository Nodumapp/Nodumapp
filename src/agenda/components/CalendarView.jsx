import React, { useMemo, useCallback } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAgenda } from "../store";

const locales = { es, "es-AR": es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

function buildTitle(a, clients, services, staff) {
  const c = clients.find((x) => x.id === a.clientId)?.name || "Sin cliente";
  const s = services.find((x) => x.id === a.serviceId)?.name || "Servicio";
  const t = staff.find((x) => x.id === a.staffId)?.name || "Staff";
  return `${s} - ${c} (${t})`;
}

export default function CalendarView({ onSelectEvent, onSelectSlot }) {
  const { appointments, services, clients, staff } = useAgenda();

  const events = useMemo(
    () =>
      appointments.map((a) => ({
        id: a.id,
        title: buildTitle(a, clients, services, staff),
        start: new Date(a.start),
        end: new Date(a.end),
        resource: a,
      })),
    [appointments, clients, services, staff]
  );

  const eventPropGetter = useCallback(
    (event) => {
      const svc = services.find((s) => s.id === event.resource.serviceId);
      return {
        style: {
          backgroundColor: svc?.color || "#0d6efd",
          border: "none",
          color: "white",
        },
      };
    },
    [services]
  );

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
