export type User = {
  name: string;
  major: 'GL' | 'GD' | 'SIDS' | 'IA' | 'RI';
  majorLabel: string;
  level: '1A' | '2A' | '3A';
  year: string;
  avatarUrl: string;
  xp: number;
  rank: string;
};

// Temporary mock until auth/user store exists
export const getCurrentUser = (): User => ({
  name: 'Ahmed Bennani',
  major: 'GL',
  majorLabel: 'Génie Logiciel',
  level: '2A',
  year: '2025',
  avatarUrl: '/placeholder.svg',
  xp: 1245,
  rank: 'Niveau 7',
});
