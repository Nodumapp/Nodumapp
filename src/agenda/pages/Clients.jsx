import React from "react";
import { useAgenda } from "../store";
import EntityTable from "../components/EntityTable";


export default function Clients(){
const { state, add, update, remove } = useAgenda();
const cols = [
{ key:'firstName', label:'Nombre' },
{ key:'lastName', label:'Apellido' },
{ key:'phone', label:'Teléfono' },
{ key:'email', label:'Email' },
];
return (
<section className="grid">
<div className="card span-12">
<EntityTable
title="Clientes"
rows={state.clients}
columns={cols}
onAdd={(draft)=> add('clients', draft)}
onUpdate={(id,patch)=> update('clients', id, patch)}
onRemove={(id)=> remove('clients', id)}
/>
</div>
</section>
);
}