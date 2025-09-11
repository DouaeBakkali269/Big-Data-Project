import { baseAcademicPeriods, loadAcademicPeriods, saveAcademicPeriods, AcademicPeriod, resolveCurrentPeriod } from '@/config/academicPeriods';

// Service layer abstracting future backend (Spring Boot) integration.
// Adjust API_BASE and endpoints when backend is available.

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

// Helper: fetch JSON with graceful fallback
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_BASE) throw new Error('NO_API_BASE');
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API_ERROR_${res.status}`);
  return res.json() as Promise<T>;
}

export interface PeriodDTO {
  id: string;
  yearLabel: string;
  semester: 'S1' | 'S2';
  order: number;
  startDate: string; // ISO date
  endDate: string;   // ISO date
  label: string;
}

// Mapping (frontend AcademicPeriod <-> backend PeriodDTO)
function toAcademic(p: PeriodDTO): AcademicPeriod {
  return {
    id: p.id,
    year: p.yearLabel,
    semester: p.semester,
    order: p.order,
    start: p.startDate,
    end: p.endDate,
    label: p.label,
  };
}

function toDTO(p: AcademicPeriod): PeriodDTO {
  return {
    id: p.id,
    yearLabel: p.year,
    semester: p.semester as 'S1' | 'S2',
    order: p.order,
    startDate: p.start,
    endDate: p.end,
    label: p.label,
  };
}

export async function fetchPeriods(): Promise<AcademicPeriod[]> {
  try {
    const list = await apiFetch<PeriodDTO[]>(`/api/periods`);
    return list.map(toAcademic).sort((a,b) => a.start.localeCompare(b.start));
  } catch (e: any) {
    // Fallback to local (offline/dev) behaviour
    if (e?.message !== 'NO_API_BASE') console.warn('[periodService] Falling back to local periods:', e);
    return loadAcademicPeriods();
  }
}

// Save full list (bulk). In backend world: send diff or upsert
export async function savePeriodsRemote(periods: AcademicPeriod[]): Promise<AcademicPeriod[]> {
  try {
    const dtos = periods.map(toDTO);
    // Example future endpoint: PUT /api/periods/bulk
    const saved = await apiFetch<PeriodDTO[]>(`/api/periods/bulk`, { method: 'PUT', body: JSON.stringify(dtos) });
    return saved.map(toAcademic);
  } catch (e) {
    // Offline fallback: persist locally
    console.warn('[periodService] Remote save failed, using localStorage fallback', e);
    saveAcademicPeriods(periods);
    return loadAcademicPeriods();
  }
}

export function resolveActivePeriod(periods: AcademicPeriod[], now = new Date()) {
  return resolveCurrentPeriod(now, periods);
}

export function getBasePeriods(): AcademicPeriod[] {
  return baseAcademicPeriods.slice();
}
