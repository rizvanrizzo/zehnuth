export interface Student {
  id: string;
  name: string;
  points: number;
  league: LeagueType;
  mentorId: string;
}

export type LeagueType = 'Diamond' | 'Platinum' | 'Emerald' | 'Gold' | 'Bronze';

export interface AwardHistory {
  id: string;
  studentId: string;
  studentName: string;
  category: string;
  points: number;
  date: string;
  mentorId: string;
}

export const LEAGUE_CONFIG: Record<LeagueType, { color: string; minPoints: number; icon: string }> = {
  Diamond: { color: 'text-blue-500 bg-blue-50 border-blue-200', minPoints: 750, icon: '💎' },
  Platinum: { color: 'text-slate-500 bg-slate-50 border-slate-200', minPoints: 500, icon: '🥈' },
  Emerald: { color: 'text-emerald-500 bg-emerald-50 border-emerald-200', minPoints: 250, icon: '✳️' },
  Gold: { color: 'text-amber-500 bg-amber-50 border-amber-200', minPoints: 100, icon: '🥇' },
  Bronze: { color: 'text-orange-500 bg-orange-50 border-orange-200', minPoints: 0, icon: '🥉' },
};

export const CATEGORIES = [
  { id: 'Exam', name: 'Exam', values: [50, 35, 25, 20, 10], icon: 'BookOpen' },
  { id: 'Writings', name: 'Writings', values: [20, 10, 5], icon: 'PenTool' },
  { id: 'Presentation', name: 'Presentation', values: [40, 30, 20, 10, 5], icon: 'Presentation' },
  { id: 'Achievements', name: 'Achievements', values: [20, 10], icon: 'Trophy' },
  { id: 'Competitions', name: 'Competitions', values: [25, 20, 15, 10, 5, 3], icon: 'Medal' },
  { id: 'Bonus', name: 'Mentor Bonus', values: [], icon: 'Star', isCustom: true },
];
