import React from "react";
import { useAgenda } from "../store";
import EntityTable from "../components/EntityTable";

export default function Clients() {
  const { clients, addClient, updateClient, removeClient } = useAgenda();

  return (
    <EntityTable
      title="Clientes"
      rows={clients}
      columns={[
        { key: "name", label: "Nombre" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Teléfono" },
      ]}
      onAdd={(row) => addClient(row)}
      onUpdate={(id, patch) => updateClient(id, patch)}
      onRemove={(id) => removeClient(id)}
    />
  );
}
