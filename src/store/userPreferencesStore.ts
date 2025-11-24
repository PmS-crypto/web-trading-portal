import { create } from 'zustand';

export interface UserPreferences {
  // Layout & UI
  defaultLayout: string | null;
  widgetDensity: 'compact' | 'comfortable' | 'spacious';
  showGridLines: boolean;
  snapToGrid: boolean;
  
  // Trading
  defaultOrderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  defaultQuantity: number;
  showAdvancedOrderTypes: boolean;
  
  // Research & Transparency
  showScoreBreakdown: boolean;
  showSourceAttribution: boolean;
  researchDepth: 'basic' | 'intermediate' | 'advanced';
  
  // Notifications
  priceAlerts: boolean;
  orderUpdates: boolean;
  recommendations: boolean;
  social: boolean;
  marketNews: boolean;
  
  // Keyboard Shortcuts
  keyboardShortcuts: Record<string, string>;
  
  // Widget Defaults
  widgetDefaults: {
    chart: {
      defaultInterval: string;
      defaultIndicators: string[];
      showVolume: boolean;
    };
    watchlist: {
      defaultColumns: string[];
      sortBy: string;
    };
  };
}

const defaultPreferences: UserPreferences = {
  defaultLayout: null,
  widgetDensity: 'comfortable',
  showGridLines: false,
  snapToGrid: true,
  defaultOrderType: 'LIMIT',
  defaultQuantity: 1,
  showAdvancedOrderTypes: false,
  showScoreBreakdown: true,
  showSourceAttribution: true,
  researchDepth: 'intermediate',
  priceAlerts: true,
  orderUpdates: true,
  recommendations: true,
  social: true,
  marketNews: true,
  keyboardShortcuts: {
    search: 'cmd+k',
    addChart: 'cmd+shift+c',
    addWatchlist: 'cmd+shift+w',
  },
  widgetDefaults: {
    chart: {
      defaultInterval: '1d',
      defaultIndicators: [],
      showVolume: true,
    },
    watchlist: {
      defaultColumns: ['symbol', 'price', 'change', 'volume'],
      sortBy: 'changePercent',
    },
  },
};

interface UserPreferencesState {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  updateNestedPreference: (
    path: string[],
    value: any
  ) => void;
  resetPreferences: () => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>((set) => ({
  preferences: defaultPreferences,
  
  updatePreference: (key, value) => {
    set((state) => ({
      preferences: {
        ...state.preferences,
        [key]: value,
      },
    }));
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('trackk-user-preferences', JSON.stringify({
        preferences: {
          ...useUserPreferencesStore.getState().preferences,
          [key]: value,
        },
      }));
    }
  },
  
  updateNestedPreference: (path, value) => {
    set((state) => {
      const newPreferences = { ...state.preferences };
      let current: any = newPreferences;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('trackk-user-preferences', JSON.stringify({ preferences: newPreferences }));
      }
      
      return { preferences: newPreferences };
    });
  },
  
  resetPreferences: () => {
    set({ preferences: defaultPreferences });
    if (typeof window !== 'undefined') {
      localStorage.setItem('trackk-user-preferences', JSON.stringify({ preferences: defaultPreferences }));
    }
  },
}));

// Load preferences from localStorage on init
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('trackk-user-preferences');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      useUserPreferencesStore.setState({ preferences: parsed.preferences });
    } catch (e) {
      // Invalid stored data, use defaults
    }
  }
}

