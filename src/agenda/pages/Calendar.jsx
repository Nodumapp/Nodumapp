import React from "react";
import { useAgenda } from "../store";
import CalendarView from "../components/CalendarView";
import AppointmentModal from "../components/AppointmentModal";

export default function CalendarPage() {
  const { state, add, update } = useAgenda();

  const [open, setOpen] = React.useState(false);
  const [initialData, setInitialData] = React.useState({});
  const [editing, setEditing] = React.useState(null);

  // NUEVA CITA (botón o selección de slot)
  const openNew = (start = new Date(), end = new Date(Date.now() + 60 * 60 * 1000)) => {
    setEditing(null);
    setInitialData({ start, end });
    setOpen(true);
  };

  // Selección en el calendario
  const handleSelectSlot = ({ start, end }) => openNew(start, end);

  // Click en evento → editar
  const handleSelectEvent = (event) => {
    const appt = event?.resource;
    if (!appt) return;
    setEditing(appt);
    setInitialData(appt);
    setOpen(true);
  };

  // Guardar
  const handleSave = (payload) => {
    if (editing) {
      update("appointments", editing.id, { ...editing, ...payload });
    } else {
      add("appointments", payload);
    }
    setOpen(false);
    setEditing(null);
    setInitialData({});
  };

  return (
    <section className="reveal">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Calendario</h5>
      </div>

      <CalendarView
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />

      <AppointmentModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
          setInitialData({});
        }}
        onSave={handleSave}
        initialData={initialData}
        clients={state.clients}
        staff={state.staff}
        services={state.services}
        title={editing ? "Editar cita" : "Nueva cita"}
      />
    </section>
  );
}
