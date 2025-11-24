import { create } from 'zustand';
import { Theme } from '@/types';

const themes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      bg: '#0a0e1a',
      surface: '#151b2e',
      accent: '#3b82f6',
      text: '#ffffff',
      textSecondary: '#94a3b8',
    },
  },
  {
    id: 'light',
    name: 'Light Mode',
    colors: {
      bg: '#f8fafc',
      surface: '#ffffff',
      accent: '#2563eb',
      text: '#0f172a',
      textSecondary: '#64748b',
    },
  },
];

interface ThemeState {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeId: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: themes[0],
  themes,
  setTheme: (themeId) => {
    const theme = themes.find(t => t.id === themeId) || themes[0];
    set({ currentTheme: theme });
    // Apply theme to document
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--color-bg', theme.colors.bg);
      document.documentElement.style.setProperty('--color-surface', theme.colors.surface);
      document.documentElement.style.setProperty('--color-accent', theme.colors.accent);
      document.documentElement.style.setProperty('--color-text', theme.colors.text);
      document.documentElement.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
      // Toggle theme classes
      document.documentElement.classList.toggle('light', theme.id === 'light');
      document.documentElement.classList.toggle('dark', theme.id === 'dark');
    }
  },
}));

