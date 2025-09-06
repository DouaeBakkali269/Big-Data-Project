import { useMemo } from 'react';
import { getCurrentUser } from '@/lib/user';

export type HighlightType = 'resource' | 'session' | 'thread' | 'question' | 'announcement';

export interface HighlightAction {
  label: string;
  to: string; // router path to navigate to
  variant?: 'default' | 'outline' | 'secondary';
}

export interface HighlightItem {
  id: string | number;
  type: HighlightType;
  title: string;
  subtitle?: string;
  channel?: string; // e.g., #questions-examens
  time: string; // human readable, e.g., "il y a 1h"
  actions: HighlightAction[];
}

/**
 * Returns a concise list of community highlights tailored to the current user.
 * Data is mocked for now and filtered by major/level to feel contextual.
 */
export function useCommunityHighlights(): HighlightItem[] {
  const user = getCurrentUser();

  return useMemo<HighlightItem[]>(() => {
    // You can later replace this with API data.
    const base: HighlightItem[] = [
      {
        id: 'res-1',
        type: 'resource',
        title: 'Nouveau Lassqa — Bases de Données Avancées',
        subtitle: 'GL • 2A • Systèmes de BD',
        channel: 'partage-ressources',
        time: 'il y a 1h',
        actions: [
          { label: 'Ouvrir', to: `/element/2025/${user.major}/${user.level}/${encodeURIComponent('Systèmes de BD')}/${encodeURIComponent('Transactions et Verrous')}` },
          { label: 'Collaborer', to: `/lassqat-planning?level=${encodeURIComponent(user.level)}&module=${encodeURIComponent('Systèmes de BD')}&element=${encodeURIComponent('Transactions et Verrous')}`, variant: 'outline' },
        ],
      },
      {
        id: 'sess-1',
        type: 'session',
        title: 'Session de révision — POO ce soir 19:00',
        subtitle: 'GL • 2A • Programmation Orientée Objet',
        channel: 'annonces-generales',
        time: 'il y a 3h',
        actions: [
          { label: 'Voir détails', to: `/lassqat-planning?level=${encodeURIComponent(user.level)}&module=${encodeURIComponent('Programmation Orientée Objet')}&element=${encodeURIComponent('Patterns de Conception')}` },
        ],
      },
      {
        id: 'q-1',
        type: 'question',
        title: 'Question d’examens — IA',
        subtitle: 'Des conseils pour l’exo de ML ?',
        channel: 'questions-examens',
        time: 'il y a 5h',
        actions: [
          { label: 'Ouvrir le chat', to: `/community?title=${encodeURIComponent('Questions Examens — IA')}&channel=${encodeURIComponent('questions-examens')}` },
        ],
      },
    ];

    // Filter by user major/level if present in subtitle to mimic scoping.
    const scoped = base.filter((h) => {
      if (!h.subtitle) return true;
      return h.subtitle.includes(user.major) && h.subtitle.includes(user.level);
    });

    return scoped.slice(0, 5);
  }, [user.major, user.level]);
}

export default useCommunityHighlights;
