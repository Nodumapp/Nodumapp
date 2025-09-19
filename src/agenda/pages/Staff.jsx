import React from "react";
import { useAgenda } from "../store";
import EntityTable from "../components/EntityTable";


export default function Staff(){
const { state, add, update, remove } = useAgenda();
const cols = [
{ key:'name', label:'Nombre' },
{ key:'role', label:'Rol' },
{ key:'phone', label:'Teléfono' },
{ key:'email', label:'Email' },
];
return (
<section className="grid">
<div className="card span-12">
<EntityTable
title="Staff"
rows={state.staff}
columns={cols}
onAdd={(draft)=> add('staff', draft)}
onUpdate={(id,patch)=> update('staff', id, patch)}
onRemove={(id)=> remove('staff', id)}
/>
</div>
</section>
);
}