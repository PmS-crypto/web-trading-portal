import { create } from 'zustand';

type View = 'dashboard' | 'watchlists' | 'screeners' | 'portfolio' | 'leaderboard' | 'learn' | 'squads' | 'settings';

interface NavigationState {
  currentView: View;
  setView: (view: View) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentView: 'dashboard',
  setView: (view) => set({ currentView: view }),
}));

