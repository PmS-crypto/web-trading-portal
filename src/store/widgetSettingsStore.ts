import { create } from 'zustand';

interface WidgetSettingsState {
  openWidgetId: string | null;
  openSettings: (widgetId: string) => void;
  closeSettings: () => void;
}

export const useWidgetSettingsStore = create<WidgetSettingsState>((set) => ({
  openWidgetId: null,
  
  openSettings: (widgetId) => {
    set({ openWidgetId: widgetId });
  },
  
  closeSettings: () => {
    set({ openWidgetId: null });
  },
}));

