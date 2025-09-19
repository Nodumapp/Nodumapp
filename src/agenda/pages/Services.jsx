import React from "react";
import { useAgenda } from "../store";
import EntityTable from "../components/EntityTable";


export default function Services(){
const { state, add, update, remove } = useAgenda();
const cols = [
{ key:'name', label:'Servicio' },
{ key:'price', label:'Precio' },
{ key:'durationMinutes', label:'Duración (min)' },
{ key:'color', label:'Color' },
];
return (
<section className="grid">
<div className="card span-12">
<EntityTable
title="Servicios"
rows={state.services}
columns={cols}
onAdd={(draft)=> add('services', draft)}
onUpdate={(id,patch)=> update('services', id, patch)}
onRemove={(id)=> remove('services', id)}
/>
</div>
</section>
);
}