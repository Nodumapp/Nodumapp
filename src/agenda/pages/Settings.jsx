// src/agenda/pages/Settings.jsx
import React from "react";
import { useAgenda } from "../store";

export default function Settings() {
  const { state, update, exportJson, importJson, reset } = useAgenda();
  const [draft, setDraft] = React.useState(state.settings);

  React.useEffect(() => setDraft(state.settings), [state.settings]);

  function save() {
    // Guardamos los ajustes en el store (puede no tener id; usamos 'settings' fijo)
    update("settings", state.settings?.id || "settings", draft);
  }

  return (
    <section className="grid">
      <div className="card span-6">
        <h5 className="mb-3">Ajustes</h5>

        <div className="mb-3">
          <label className="form-label">Nombre del negocio</label>
          <input
            className="form-control"
            value={draft.businessName || ""}
            onChange={(e) => setDraft({ ...draft, businessName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Zona horaria</label>
          <input
            className="form-control"
            value={draft.timezone || ""}
            onChange={(e) => setDraft({ ...draft, timezone: e.target.value })}
          />
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="remEmail"
            checked={!!draft.remindersEmail}
            onChange={(e) =>
              setDraft({ ...draft, remindersEmail: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="remEmail">
            Habilitar recordatorios por email
          </label>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="remSms"
            checked={!!draft.remindersSms}
            onChange={(e) =>
              setDraft({ ...draft, remindersSms: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="remSms">
            Habilitar recordatorios por SMS
          </label>
        </div>

        <button className="btn primary" onClick={save}>
          Guardar ajustes
        </button>
      </div>

      <div className="card span-6">
        <h5 className="mb-3">Backup</h5>

        <div className="d-flex gap-2">
          <button
            className="btn"
            onClick={() => {
              const blob = new Blob([exportJson()], { type: "application/json" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "agenda_backup.json";
              a.click();
            }}
          >
            Exportar JSON
          </button>

          <label className="btn">
            Importar JSON
            <input
              hidden
              type="file"
              accept="application/json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => importJson(String(reader.result || ""));
                reader.readAsText(file);
              }}
            />
          </label>

          <button className="btn" onClick={reset}>
            Reiniciar (vaciar)
          </button>
        </div>
      </div>
    </section>
  );
}
