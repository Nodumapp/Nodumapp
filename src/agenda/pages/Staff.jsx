import React from "react";
import { useAgenda } from "../store";
import EntityTable from "../components/EntityTable";
import StaffModal from "../components/StaffModal";
import StaffInfoModal from "../components/StaffInfoModal";

export default function Staff(){
  const { state, add, update, remove } = useAgenda();

  const [q, setQ] = React.useState("");
  const [openNew, setOpenNew] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const columns = [
    { key: "name",  label: "Nombre" },
    { key: "role",  label: "Rol" },
    { key: "phone", label: "Teléfono" },
    { key: "email", label: "Email" },
  ];

  const rows = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return state.staff;
    return state.staff.filter((s) => {
      const t = [s.name, s.role, s.email, s.phone].filter(Boolean).join(" ").toLowerCase();
      return t.includes(term);
    });
  }, [state.staff, q]);

  return (
    <section className="reveal">
      <EntityTable
        title="Staff"
        rows={rows}
        columns={columns}
        onAdd={() => {}}
        onUpdate={(id, patch) => update("staff", id, patch)}
        onRemove={(id) => remove("staff", id)}
        onInfoRow={(row) => { setSelected(row); setInfoOpen(true); }}
        onEditRow={(row) => { setSelected(row); setEditOpen(true); }}
        quickAdd={false}
        showSearch
        onSearch={setQ}
        searchPlaceholder="Buscar staff (nombre, rol, email, teléfono)"
        rightActions={
          <button className="btn primary" onClick={() => setOpenNew(true)}>Nuevo</button>
        }
      />

      {/* Nuevo */}
      <StaffModal
        open={openNew}
        onClose={() => setOpenNew(false)}
        title="Nuevo miembro del staff"
        onSave={(payload) => { add("staff", payload); setOpenNew(false); }}
      />

      {/* Modificar */}
      <StaffModal
        open={editOpen}
        onClose={() => { setEditOpen(false); setSelected(null); }}
        title="Modificar staff"
        initialData={selected || null}
        onSave={(payload) => {
          if (selected?.id) update("staff", selected.id, { ...selected, ...payload });
          setEditOpen(false); setSelected(null);
        }}
      />

      {/* Info */}
      <StaffInfoModal
        open={infoOpen}
        onClose={() => { setInfoOpen(false); setSelected(null); }}
        staff={selected}
      />
    </section>
  );
}
