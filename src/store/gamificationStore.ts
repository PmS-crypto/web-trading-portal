import { create } from 'zustand';
import { LeaderboardEntry } from '@/types';

interface GamificationState {
  badges: string[];
  streaks: {
    research: number;
    trading: number;
    login: number;
    bestStreak: number;
  };
  level: number;
  xp: number;
  leaderboardRank: number;
  achievements: Record<string, number>;
  
  // Actions
  addBadge: (badgeId: string) => void;
  updateStreak: (type: 'research' | 'trading' | 'login', value: number) => void;
  addXP: (amount: number) => void;
  updateAchievement: (achievementId: string, progress: number) => void;
  setLeaderboardRank: (rank: number) => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  badges: ['trader', 'researcher'],
  streaks: {
    research: 7,
    trading: 3,
    login: 12,
    bestStreak: 15,
  },
  level: 3,
  xp: 1250,
  leaderboardRank: 5,
  achievements: {
    researcher: 47,
    trader: 10,
    analyst: 3,
    diversifier: 3,
  },

  addBadge: (badgeId) => {
    set((state) => ({
      badges: [...state.badges, badgeId],
    }));
  },

  updateStreak: (type, value) => {
    set((state) => ({
      streaks: {
        ...state.streaks,
        [type]: value,
        bestStreak: Math.max(state.streaks.bestStreak, value),
      },
    }));
  },

  addXP: (amount) => {
    set((state) => {
      const newXP = state.xp + amount;
      const xpPerLevel = 1000;
      const newLevel = Math.floor(newXP / xpPerLevel) + 1;
      
      return {
        xp: newXP,
        level: newLevel,
      };
    });
  },

  updateAchievement: (achievementId, progress) => {
    set((state) => ({
      achievements: {
        ...state.achievements,
        [achievementId]: progress,
      },
    }));
  },

  setLeaderboardRank: (rank) => {
    set({ leaderboardRank: rank });
  },
}));


