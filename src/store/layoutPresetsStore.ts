import { create } from 'zustand';
import { DashboardLayout, DashboardWidget } from '@/types';

export interface LayoutPreset {
  id: string;
  name: string;
  description: string;
  category: 'trading' | 'research' | 'analysis' | 'custom';
  icon: string;
  widgets: DashboardWidget[];
  isDefault?: boolean;
}

const defaultPresets: LayoutPreset[] = [
  {
    id: 'day-trader',
    name: 'Day Trader',
    description: 'Optimized for active day trading with multiple charts and order book',
    category: 'trading',
    icon: '⚡',
    widgets: [
      {
        id: 'chart-1',
        type: 'chart',
        position: { x: 0, y: 0, w: 8, h: 6 },
        config: { symbol: 'NIFTY', interval: '5m' },
        isPinned: false,
      },
      {
        id: 'chart-2',
        type: 'chart',
        position: { x: 8, y: 0, w: 4, h: 6 },
        config: { symbol: 'BANKNIFTY', interval: '5m' },
        isPinned: false,
      },
      {
        id: 'watchlist-1',
        type: 'watchlist',
        position: { x: 0, y: 6, w: 4, h: 4 },
        config: { name: 'Active Trades' },
        isPinned: false,
      },
      {
        id: 'orderbook-1',
        type: 'orderbook',
        position: { x: 4, y: 6, w: 4, h: 4 },
        config: {},
        isPinned: false,
      },
      {
        id: 'score-1',
        type: 'score',
        position: { x: 8, y: 6, w: 4, h: 4 },
        config: { symbol: 'NIFTY' },
        isPinned: false,
      },
    ],
  },
  {
    id: 'researcher',
    name: 'Researcher',
    description: 'Deep research workspace with score breakdown and news',
    category: 'research',
    icon: '🔬',
    widgets: [
      {
        id: 'chart-1',
        type: 'chart',
        position: { x: 0, y: 0, w: 6, h: 5 },
        config: { symbol: 'RELIANCE', interval: '1d' },
        isPinned: false,
      },
      {
        id: 'score-1',
        type: 'score',
        position: { x: 6, y: 0, w: 6, h: 5 },
        config: { symbol: 'RELIANCE' },
        isPinned: false,
      },
      {
        id: 'news-1',
        type: 'news',
        position: { x: 0, y: 5, w: 6, h: 5 },
        config: {},
        isPinned: false,
      },
      {
        id: 'watchlist-1',
        type: 'watchlist',
        position: { x: 6, y: 5, w: 6, h: 5 },
        config: { name: 'Research List' },
        isPinned: false,
      },
    ],
  },
  {
    id: 'portfolio-manager',
    name: 'Portfolio Manager',
    description: 'Focus on portfolio tracking and performance',
    category: 'analysis',
    icon: '📊',
    widgets: [
      {
        id: 'portfolio-1',
        type: 'portfolio',
        position: { x: 0, y: 0, w: 6, h: 6 },
        config: {},
        isPinned: false,
      },
      {
        id: 'chart-1',
        type: 'chart',
        position: { x: 6, y: 0, w: 6, h: 4 },
        config: { symbol: 'PORTFOLIO', interval: '1d' },
        isPinned: false,
      },
      {
        id: 'watchlist-1',
        type: 'watchlist',
        position: { x: 6, y: 4, w: 6, h: 4 },
        config: { name: 'Holdings' },
        isPinned: false,
      },
    ],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, focused workspace',
    category: 'custom',
    icon: '✨',
    widgets: [
      {
        id: 'chart-1',
        type: 'chart',
        position: { x: 0, y: 0, w: 12, h: 8 },
        config: { symbol: 'NIFTY', interval: '1d' },
        isPinned: false,
      },
    ],
  },
];

interface LayoutPresetsState {
  presets: LayoutPreset[];
  userPresets: LayoutPreset[];
  addUserPreset: (preset: Omit<LayoutPreset, 'id'>) => void;
  deleteUserPreset: (presetId: string) => void;
  applyPreset: (presetId: string) => DashboardWidget[];
}

export const useLayoutPresetsStore = create<LayoutPresetsState>((set, get) => ({
  presets: defaultPresets,
  userPresets: [],
  
  addUserPreset: (preset) => {
    const newPreset: LayoutPreset = {
      ...preset,
      id: `user-preset-${Date.now()}`,
    };
    set((state) => ({
      userPresets: [...state.userPresets, newPreset],
    }));
  },
  
  deleteUserPreset: (presetId) => {
    set((state) => ({
      userPresets: state.userPresets.filter(p => p.id !== presetId),
    }));
  },
  
  applyPreset: (presetId) => {
    const { presets, userPresets } = get();
    const allPresets = [...presets, ...userPresets];
    const preset = allPresets.find(p => p.id === presetId);
    
    if (!preset) {
      return [];
    }
    
    // Generate new IDs for widgets to avoid conflicts
    return preset.widgets.map(widget => ({
      ...widget,
      id: `${widget.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));
  },
}));

