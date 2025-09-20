// src/agenda/pages/Clients.jsx
import React from "react";
import { useAgenda } from "../store";
import EntityTable from "../components/EntityTable";
import ClientModal from "../components/ClientModal";
import ClientInfoModal from "../components/ClientInfoModal";

export default function Clients(){
  const { state, add, update, remove } = useAgenda();

  const [q, setQ] = React.useState("");
  const [openNew, setOpenNew] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const columns = [
    { key: "firstName", label: "Nombre" },
    { key: "lastName",  label: "Apellido" },
    { key: "phone",     label: "Teléfono" },
    { key: "email",     label: "Email" },
  ];

  const rows = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return state.clients;
    return state.clients.filter((c) => {
      const t = [c.firstName, c.lastName, c.name, c.email, c.phone, c.dni, c.cuit, c.address]
        .filter(Boolean).join(" ").toLowerCase();
      return t.includes(term);
    });
  }, [state.clients, q]);

  return (
    <section className="reveal">
      <EntityTable
        title="Clientes"
        rows={rows}
        columns={columns}
        onAdd={() => {}}
        onUpdate={(id, patch) => update("clients", id, patch)}
        onRemove={(id) => remove("clients", id)}
        onInfoRow={(row) => { setSelected(row); setInfoOpen(true); }}     // ← Info
        onEditRow={(row) => { setSelected(row); setEditOpen(true); }}     // ← Modificar
        quickAdd={false}
        showSearch
        onSearch={setQ}
        searchPlaceholder="Buscar cliente (nombre, email, teléfono, DNI, CUIT)"
        rightActions={
          <button className="btn primary" onClick={() => setOpenNew(true)}>Nuevo</button>
        }
      />

      {/* Alta */}
      <ClientModal
        open={openNew}
        onClose={() => setOpenNew(false)}
        title="Nuevo cliente"
        onSave={(payload) => { add("clients", payload); setOpenNew(false); }}
      />

      {/* Editar */}
      <ClientModal
        open={editOpen}
        onClose={() => { setEditOpen(false); setSelected(null); }}
        title="Modificar cliente"
        initialData={selected || {}}
        onSave={(payload) => {
          if (selected?.id) update("clients", selected.id, { ...selected, ...payload });
          setEditOpen(false); setSelected(null);
        }}
      />

      {/* Info */}
      <ClientInfoModal
        open={infoOpen}
        onClose={() => { setInfoOpen(false); setSelected(null); }}
        client={selected}
      />
    </section>
  );
}
