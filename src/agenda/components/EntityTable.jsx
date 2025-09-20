// src/agenda/components/EntityTable.jsx
import React, { useEffect, useMemo, useState } from "react";

/**
 * props extra:
 * - onInfoRow?:  (row) => void
 * - onEditRow?:  (row) => void
 */
export default function EntityTable({
  title = "",
  rows = [],
  columns = [],
  onAdd,
  onUpdate,
  onRemove,
  onInfoRow,         // <- NUEVO
  onEditRow,         // <- NUEVO
  quickAdd = true,
  showSearch = false,
  onSearch,
  searchPlaceholder = "Buscar…",
  rightActions = null,
}) {
  const [draft, setDraft] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!showSearch || !onSearch) return;
    const t = setTimeout(() => onSearch(query.trim()), 250);
    return () => clearTimeout(t);
  }, [query, onSearch, showSearch]);

  const handleDraftChange = (key, val) => setDraft((d) => ({ ...d, [key]: val }));

  const handleAdd = () => {
    if (!onAdd) return;
    const payload = {};
    columns.forEach((c) => (payload[c.key] = draft[c.key] ?? ""));
    onAdd(payload);
    setDraft({});
  };

  const handleKeyAdd = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const colMap = useMemo(
    () => columns.reduce((acc, c) => ((acc[c.key] = c), acc), {}),
    [columns]
  );

  return (
    <div className="card p-3">
      {/* Toolbar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
        <h5 className="m-0">{title}</h5>
        <div className="d-flex align-items-center gap-2">
          {showSearch && (
            <input
              className="form-control"
              style={{ minWidth: 260 }}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          {rightActions}
        </div>
      </div>

      <table className="table align-middle">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            <th style={{ width: 240 }} /> {/* más ancho para 3 botones */}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-muted">
                Sin registros
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {columns.map((c) => {
                  const value = row[c.key] ?? "";
                  if (c.readOnly) {
                    return (
                      <td key={c.key}>
                        <span className="text-body">{String(value)}</span>
                      </td>
                    );
                  }
                  return (
                    <td key={c.key}>
                      {c.type === "select" ? (
                        <select
                          className="form-select form-select-sm"
                          value={value}
                          onChange={(e) => onUpdate?.(row.id, { [c.key]: e.target.value })}
                        >
                          <option value="">Seleccionar…</option>
                          {(c.options || []).map((opt) => (
                            <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
                              {opt.label ?? opt.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="form-control form-control-sm"
                          type={c.type || "text"}
                          placeholder={c.placeholder || c.label}
                          value={value}
                          onChange={(e) => onUpdate?.(row.id, { [c.key]: e.target.value })}
                        />
                      )}
                    </td>
                  );
                })}

                <td className="text-end d-flex gap-2 justify-content-end">
                  <button
                    className="btn btn-sm"
                    onClick={() => onInfoRow?.(row)}
                  >
                    Info
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEditRow?.(row)}
                  >
                    Modificar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onRemove?.(row.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}

          {quickAdd && (
            <tr>
              {columns.map((c) => (
                <td key={c.key}>
                  {c.type === "select" ? (
                    <select
                      className="form-select form-select-sm"
                      value={draft[c.key] ?? ""}
                      onChange={(e) => handleDraftChange(c.key, e.target.value)}
                      onKeyDown={handleKeyAdd}
                    >
                      <option value="">{c.placeholder || `Seleccionar ${c.label}`}</option>
                      {(c.options || []).map((opt) => (
                        <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
                          {opt.label ?? opt.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="form-control form-control-sm"
                      type={c.type || "text"}
                      placeholder={c.placeholder || c.label}
                      value={draft[c.key] ?? ""}
                      onChange={(e) => handleDraftChange(c.key, e.target.value)}
                      onKeyDown={handleKeyAdd}
                    />
                  )}
                </td>
              ))}
              <td className="text-end">
                <button className="btn btn-sm primary" onClick={handleAdd}>
                  Agregar
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
