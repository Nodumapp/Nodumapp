import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { addMinutes, parseISO } from "date-fns";

// --- helpers ---
function uid() {
  return (typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}
function toDate(d) {
  if (!d) return null;
  if (d instanceof Date) return d;
  const asNum = +d;
  if (!Number.isNaN(asNum)) return new Date(asNum);
  try { return parseISO(d); } catch { return new Date(d); }
}
function toISO(d) {
  const dt = toDate(d);
  return dt ? dt.toISOString() : null;
}

// --- estado inicial ---
const initialState = {
  clients: [],
  services: [
    { id: uid(), name: "Consulta", duration: 30, price: 0, color: "#0d6efd" },
  ],
  staff: [
    {
      id: uid(),
      name: "Staff General",
      email: "staff@nodum.app",
      color: "#6f42c1",
      availability: {
        mon: [{ start: "09:00", end: "17:00" }],
        tue: [{ start: "09:00", end: "17:00" }],
        wed: [{ start: "09:00", end: "17:00" }],
        thu: [{ start: "09:00", end: "17:00" }],
        fri: [{ start: "09:00", end: "17:00" }],
        sat: [],
        sun: [],
      },
    },
  ],
  appointments: [],
  settings: {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    slotMinutes: 30,
    weekStartsOn: 1,
    businessHours: {
      mon: [{ start: "09:00", end: "17:00" }],
      tue: [{ start: "09:00", end: "17:00" }],
      wed: [{ start: "09:00", end: "17:00" }],
      thu: [{ start: "09:00", end: "17:00" }],
      fri: [{ start: "09:00", end: "17:00" }],
      sat: [],
      sun: [],
    },
  },
};

// --- store ---
export const useAgenda = create(
  persist(
    (set, get) => ({
      // DATA
      ...initialState,

      // ===== CLIENTES =====
      addClient: (payload) =>
        set((s) => ({ clients: [...s.clients, { id: uid(), ...payload }] })),
      updateClient: (id, patch) =>
        set((s) => ({
          clients: s.clients.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      removeClient: (id) =>
        set((s) => ({ clients: s.clients.filter((c) => c.id !== id) })),

      // ===== SERVICIOS =====
      addService: (payload) =>
        set((s) => ({ services: [...s.services, { id: uid(), ...payload }] })),
      updateService: (id, patch) =>
        set((s) => ({
          services: s.services.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        })),
      removeService: (id) =>
        set((s) => ({ services: s.services.filter((c) => c.id !== id) })),

      // ===== STAFF =====
      addStaff: (payload) =>
        set((s) => ({ staff: [...s.staff, { id: uid(), ...payload }] })),
      updateStaff: (id, patch) =>
        set((s) => ({
          staff: s.staff.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      removeStaff: (id) =>
        set((s) => ({ staff: s.staff.filter((c) => c.id !== id) })),

      // ===== APPOINTMENTS (TURNOS) =====
      addAppointment: (payload) => {
        const s = get();
        const service =
          s.services.find((x) => x.id === payload.serviceId) || null;

        const startISO = toISO(payload.start) || new Date().toISOString();
        const endISO =
          toISO(payload.end) ||
          toISO(addMinutes(toDate(startISO), service?.duration || s.settings.slotMinutes || 30));

        const appt = {
          id: uid(),
          clientId: payload.clientId || null,
          staffId: payload.staffId || null,
          serviceId: payload.serviceId || null,
          start: startISO,
          end: endISO,
          status: payload.status || "booked", // booked | confirmed | cancelled | no-show
          notes: payload.notes || "",
          reminders: {
            email: !!payload?.reminders?.email,
            sms: !!payload?.reminders?.sms,
          },
          price: payload.price ?? service?.price ?? 0,
        };

        set((state) => ({ appointments: [...state.appointments, appt] }));
        return appt.id;
      },

      updateAppointment: (id, patch) =>
        set((s) => {
          const current = s.appointments.find((a) => a.id === id);
          if (!current) return { appointments: s.appointments };

          // si cambiaron start o serviceId y no llega end, recalculamos end
          const willChangeStart = "start" in patch;
          const willChangeSvc = "serviceId" in patch;

          let next = { ...current, ...patch };

          if ((willChangeStart || willChangeSvc) && !("end" in patch)) {
            const svc =
              s.services.find((x) => x.id === next.serviceId) || null;
            const startISO = toISO(next.start) || current.start;
            const endISO = toISO(
              addMinutes(toDate(startISO), svc?.duration || s.settings.slotMinutes || 30)
            );
            next.start = startISO;
            next.end = endISO;
          } else {
            // normalizar si dieron fechas
            if ("start" in patch) next.start = toISO(patch.start);
            if ("end" in patch) next.end = toISO(patch.end);
          }

          return {
            appointments: s.appointments.map((a) => (a.id === id ? next : a)),
          };
        }),

      removeAppointment: (id) =>
        set((s) => ({ appointments: s.appointments.filter((a) => a.id !== id) })),

      // ===== SELECTORES / UTIL =====
      getClient: (id) => get().clients.find((c) => c.id === id) || null,
      getService: (id) => get().services.find((c) => c.id === id) || null,
      getStaff: (id) => get().staff.find((c) => c.id === id) || null,
      getAppointment: (id) =>
        get().appointments.find((a) => a.id === id) || null,

      listAppointmentsByDay: (yyyymmdd) => {
        // yyyymmdd = '2025-09-06'
        const day = new Date(yyyymmdd + "T00:00:00");
        const start = day.getTime();
        const end = start + 24 * 60 * 60 * 1000;
        return get().appointments.filter((a) => {
          const t = +toDate(a.start);
          return t >= start && t < end;
        });
      },

      resetAll: () => set(() => JSON.parse(JSON.stringify(initialState))),

      exportData: () => {
        const { clients, services, staff, appointments, settings } = get();
        return { clients, services, staff, appointments, settings };
      },
      importData: (data) =>
        set(() => {
          const safe = {
            clients: Array.isArray(data?.clients) ? data.clients : [],
            services: Array.isArray(data?.services) ? data.services : [],
            staff: Array.isArray(data?.staff) ? data.staff : [],
            appointments: Array.isArray(data?.appointments)
              ? data.appointments
              : [],
            settings: { ...initialState.settings, ...(data?.settings || {}) },
          };
          return safe;
        }),
    }),
    {
      name: "agenda:v1",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // guardamos solo los datos, no las funciones
      partialize: (state) => ({
        clients: state.clients,
        services: state.services,
        staff: state.staff,
        appointments: state.appointments,
        settings: state.settings,
      }),
      // migraciones por si cambiás el shape a futuro
      migrate: (persistedState, version) => {
        if (!persistedState) return persistedState;
        // ejemplo simple: asegurar que appointments tenga reminders
        if (version < 1 && Array.isArray(persistedState.appointments)) {
          persistedState.appointments = persistedState.appointments.map((a) => ({
            reminders: { email: !!a?.reminders?.email, sms: !!a?.reminders?.sms },
            ...a,
          }));
        }
        return persistedState;
      },
    }
  )
);
