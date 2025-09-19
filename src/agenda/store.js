// src/agenda/store.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

/* ----------------------- Estado inicial ----------------------- */
const initialState = {
  appointments: [], // {id, clientId, staffId, serviceId, status, start, end, notes, reminders}
  clients: [], // {id, firstName, lastName, phone, email}
  staff: [], // {id, name, phone, email, role}
  services: [], // {id, name, price, durationMinutes, color}
  settings: {
    businessName: "Nodum Agenda",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    weekStartsOn: 1,
    remindersEmail: true,
    remindersSms: false,
  },
};

/* ----------------------- Contexto & tipos --------------------- */
const StoreCtx = createContext(null);

const DISPATCH_TYPES = {
  HYDRATE: "HYDRATE",
  BULK_SET: "BULK_SET",
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
};

/* ----------------------- Utils ----------------------- */
function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

/* ----------------------- Reducer --------------------- */
function reducer(state, action) {
  switch (action.type) {
    case DISPATCH_TYPES.HYDRATE:
      return { ...state, ...action.payload };

    case DISPATCH_TYPES.BULK_SET:
      return { ...state, [action.key]: action.items };

    case DISPATCH_TYPES.ADD:
      return {
        ...state,
        [action.key]: [...state[action.key], action.item],
      };

    case DISPATCH_TYPES.UPDATE:
      return {
        ...state,
        [action.key]: state[action.key].map((it) =>
          it.id === action.id ? { ...it, ...action.patch } : it
        ),
      };

    case DISPATCH_TYPES.REMOVE:
      return {
        ...state,
        [action.key]: state[action.key].filter((it) => it.id !== action.id),
      };

    default:
      return state;
  }
}

/* ----------------------- Persistencia --------------------- */
const STORAGE_KEY = "nodum_agenda_data_v1";

/* ----------------------- Provider ----------------------- */
export function AgendaProvider({ children, seed = true }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hidratar desde localStorage (o sembrar demo)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: DISPATCH_TYPES.HYDRATE, payload: JSON.parse(raw) });
      } else if (seed) {
        // Datos de ejemplo
        const exClients = [
          {
            id: uid("cli"),
            firstName: "Juan",
            lastName: "Pérez",
            phone: "+54 9 11 5555-0001",
            email: "juan@example.com",
          },
          {
            id: uid("cli"),
            firstName: "Ana",
            lastName: "García",
            phone: "+54 9 11 5555-0002",
            email: "ana@example.com",
          },
        ];

        const exStaff = [
          {
            id: uid("stf"),
            name: "Lucía",
            phone: "+54 9 11 5555-0011",
            email: "lucia@nodum.app",
            role: "Stylist",
          },
          {
            id: uid("stf"),
            name: "Mario",
            phone: "+54 9 11 5555-0012",
            email: "mario@nodum.app",
            role: "Barber",
          },
        ];

        const exServices = [
          {
            id: uid("svc"),
            name: "Corte clásico",
            price: 8000,
            durationMinutes: 45,
            color: "#2563eb",
          },
          {
            id: uid("svc"),
            name: "Color + Brushing",
            price: 15000,
            durationMinutes: 90,
            color: "#10b981",
          },
        ];

        const now = Date.now();
        const exAppt = [
          {
            id: uid("apt"),
            clientId: exClients[0].id,
            staffId: exStaff[0].id,
            serviceId: exServices[0].id,
            status: "confirmed",
            start: new Date(now + 2 * 3600000),
            end: new Date(now + 3 * 3600000),
            notes: "Primera vez",
            reminders: { email: true, sms: false },
          },
        ];

        const seeded = {
          ...initialState,
          clients: exClients,
          staff: exStaff,
          services: exServices,
          appointments: exAppt,
        };
        dispatch({ type: DISPATCH_TYPES.HYDRATE, payload: seeded });
      }
    } catch (e) {
      console.error("Hydrate error", e);
    }
  }, [seed]);

  // Persistir cada cambio
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  // API del store
  const api = useMemo(
    () => ({
      state,

      add: (key, item) =>
        dispatch({
          type: DISPATCH_TYPES.ADD,
          key,
          item: { id: item.id || uid(key), ...item },
        }),

      update: (key, id, patch) =>
        dispatch({ type: DISPATCH_TYPES.UPDATE, key, id, patch }),

      remove: (key, id) => dispatch({ type: DISPATCH_TYPES.REMOVE, key, id }),

      setAll: (key, items) =>
        dispatch({ type: DISPATCH_TYPES.BULK_SET, key, items }),

      reset: () =>
        dispatch({ type: DISPATCH_TYPES.HYDRATE, payload: initialState }),

      exportJson: () => JSON.stringify(state, null, 2),

      importJson: (json) => {
        try {
          const data = JSON.parse(json);
          dispatch({ type: DISPATCH_TYPES.HYDRATE, payload: data });
        } catch (e) {
          alert("JSON inválido");
        }
      },
    }),
    [state]
  );

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>;
}

/* ----------------------- Hook ----------------------- */
export function useAgenda() {
  const ctx = useContext(StoreCtx);
  if (!ctx) {
    throw new Error("useAgenda debe usarse dentro de <AgendaProvider>");
  }
  return ctx;
}
