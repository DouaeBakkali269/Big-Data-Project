// Centralized academic periods config + local override mechanism
// This is a lightweight interim solution before a backend/admin persistence layer.

export type AcademicPeriod = {
  id: string;              // unique key e.g. 2025-p1
  year: string;            // academic year label e.g. "2025-2026"
  semester: 'S1' | 'S2';   // semester grouping
  order: number;           // ordering inside the semester
  start: string;           // ISO date (YYYY-MM-DD)
  end: string;             // ISO date (YYYY-MM-DD)
  label: string;           // human label shown in UI
};

// Base canonical periods (edit here yearly OR replace by backend fetch later)
export const baseAcademicPeriods: AcademicPeriod[] = [
  { id: '2025-p1', year: '2025-2026', semester: 'S1', order: 1, start: '2025-09-08', end: '2025-11-01', label: 'P1 (Sem.1–8)' },
  { id: '2025-p2', year: '2025-2026', semester: 'S1', order: 2, start: '2025-11-10', end: '2026-01-03', label: 'P2 (Sem.8–15)' },
  // Example placeholders for S2 (adjust when calendar known)
  { id: '2026-p3', year: '2025-2026', semester: 'S2', order: 3, start: '2026-02-10', end: '2026-04-05', label: 'P3 (Sem.1–8 S2)' },
  { id: '2026-p4', year: '2025-2026', semester: 'S2', order: 4, start: '2026-04-14', end: '2026-06-10', label: 'P4 (Sem.8–15 S2)' },
];

// Local storage key for temporary admin overrides (no backend yet)
const OVERRIDE_KEY = 'lassqat.periodOverrides';

export const loadAcademicPeriods = (): AcademicPeriod[] => {
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY);
    if (!raw) return baseAcademicPeriods.slice();
    const parsed: AcademicPeriod[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return baseAcademicPeriods.slice();
    // Basic validation & merge (override by id)
    const map = new Map<string, AcademicPeriod>();
    baseAcademicPeriods.forEach(p => map.set(p.id, p));
    parsed.forEach(p => {
      if (p && p.id && p.start && p.end) map.set(p.id, p);
    });
    return Array.from(map.values()).sort((a,b) => a.start.localeCompare(b.start));
  } catch {
    return baseAcademicPeriods.slice();
  }
};

export const saveAcademicPeriods = (periods: AcademicPeriod[]) => {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(periods));
};

export const resolveCurrentPeriod = (today = new Date(), periods = loadAcademicPeriods()): AcademicPeriod => {
  const ts = today.getTime();
  const active = periods.filter(p => ts >= new Date(p.start).getTime() && ts <= new Date(p.end).getTime());
  if (active.length > 0) {
    return active.sort((a,b) => a.order - b.order)[0];
  }
  // fallback: before earliest -> earliest; after latest -> latest
  const sorted = periods.slice().sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  if (ts < new Date(sorted[0].start).getTime()) return sorted[0];
  return sorted[sorted.length - 1];
};

// Simple overlap validator (for admin UI feedback later)
export const findOverlaps = (periods: AcademicPeriod[]): { a: AcademicPeriod; b: AcademicPeriod }[] => {
  const overlaps: { a: AcademicPeriod; b: AcademicPeriod }[] = [];
  for (let i=0;i<periods.length;i++) {
    for (let j=i+1;j<periods.length;j++) {
      const A = periods[i]; const B = periods[j];
      if (new Date(A.start) <= new Date(B.end) && new Date(B.start) <= new Date(A.end)) {
        overlaps.push({ a: A, b: B });
      }
    }
  }
  return overlaps;
};
