import { create } from 'zustand';
import { DashboardWidget, DashboardLayout } from '@/types';

interface DashboardState {
  layouts: DashboardLayout[];
  currentLayout: string | null;
  widgets: DashboardWidget[];
  isDragging: boolean;
  
  // Actions
  setCurrentLayout: (layoutId: string) => void;
  addWidget: (widget: DashboardWidget) => void;
  removeWidget: (widgetId: string) => void;
  updateWidget: (widgetId: string, updates: Partial<DashboardWidget>) => void;
  updateWidgetPosition: (widgetId: string, position: DashboardWidget['position']) => void;
  saveLayout: (name: string) => void;
  loadLayout: (layoutId: string) => void;
  setDragging: (isDragging: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  layouts: [],
  currentLayout: null,
  widgets: [],
  isDragging: false,

  setCurrentLayout: (layoutId) => {
    const layout = get().layouts.find(l => l.id === layoutId);
    if (layout) {
      set({ currentLayout: layoutId, widgets: layout.widgets });
    }
  },

  addWidget: (widget) => {
    set((state) => ({
      widgets: [...state.widgets, widget],
    }));
  },

  removeWidget: (widgetId) => {
    set((state) => ({
      widgets: state.widgets.filter(w => w.id !== widgetId),
    }));
  },

  updateWidget: (widgetId, updates) => {
    set((state) => ({
      widgets: state.widgets.map(w =>
        w.id === widgetId ? { ...w, ...updates } : w
      ),
    }));
  },

  updateWidgetPosition: (widgetId, position) => {
    set((state) => ({
      widgets: state.widgets.map(w =>
        w.id === widgetId ? { ...w, position } : w
      ),
    }));
  },

  saveLayout: (name) => {
    const { widgets, currentLayout } = get();
    const layout: DashboardLayout = {
      id: `layout-${Date.now()}`,
      name,
      widgets: [...widgets],
      isDefault: false,
      createdAt: new Date(),
    };
    
    set((state) => ({
      layouts: [...state.layouts, layout],
      currentLayout: layout.id,
    }));
  },

  loadLayout: (layoutId) => {
    get().setCurrentLayout(layoutId);
  },

  setDragging: (isDragging) => {
    set({ isDragging });
  },
}));


