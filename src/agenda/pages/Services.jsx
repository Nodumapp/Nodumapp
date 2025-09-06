import React from "react";
import { useAgenda } from "../store";
import EntityTable from "../components/EntityTable";

export default function Services() {
  const { services, addService, updateService, removeService } = useAgenda();

  return (
    <EntityTable
      title="Servicios"
      rows={services}
      columns={[
        { key: "name", label: "Nombre" },
        { key: "duration", label: "Duración (min)" },
        { key: "price", label: "Precio" },
        { key: "color", label: "Color" },
      ]}
      onAdd={(row) => {
        const payload = {
          name: row.name || "",
          duration: Number(row.duration) || 30,
          price: Number(row.price) || 0,
          color: row.color || "#0d6efd",
        };
        addService(payload);
      }}
      onUpdate={(id, patch) => {
        const normalized = { ...patch };
        if ("duration" in normalized) normalized.duration = Number(normalized.duration) || 30;
        if ("price" in normalized) normalized.price = Number(normalized.price) || 0;
        updateService(id, normalized);
      }}
      onRemove={(id) => removeService(id)}
    />
  );
}
