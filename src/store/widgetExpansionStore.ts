import { create } from 'zustand';

interface WidgetExpansionState {
  expandedWidgetId: string | null;
  expandWidget: (widgetId: string) => void;
  collapseWidget: () => void;
  isExpanded: (widgetId: string) => boolean;
}

export const useWidgetExpansionStore = create<WidgetExpansionState>((set, get) => ({
  expandedWidgetId: null,
  expandWidget: (widgetId) => set({ expandedWidgetId: widgetId }),
  collapseWidget: () => set({ expandedWidgetId: null }),
  isExpanded: (widgetId) => get().expandedWidgetId === widgetId,
}));


