'use client';

import { useState } from 'react';
import { Layout, Grid, Zap, ChevronRight } from 'lucide-react';
import { useLayoutPresetsStore } from '@/store/layoutPresetsStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';

export function LayoutPresetSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { presets, userPresets, applyPreset } = useLayoutPresetsStore();
  const { widgets, addWidget, removeWidget } = useDashboardStore();
  const allPresets = [...presets, ...userPresets];

  const handleApplyPreset = (presetId: string) => {
    // Clear existing widgets
    widgets.forEach(widget => removeWidget(widget.id));
    
    // Add new widgets from preset
    const newWidgets = applyPreset(presetId);
    newWidgets.forEach(widget => addWidget(widget));
    
    setIsOpen(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading':
        return <Zap className="w-4 h-4" />;
      case 'research':
        return <Grid className="w-4 h-4" />;
      case 'analysis':
        return <Layout className="w-4 h-4" />;
      default:
        return <Layout className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trading':
        return 'text-yellow-500';
      case 'research':
        return 'text-blue-500';
      case 'analysis':
        return 'text-green-500';
      default:
        return 'text-text-secondary';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-40 px-4 py-2 rounded-lg bg-surface border border-gray-800/50 text-text-secondary hover:text-text hover:bg-surface/80 transition-all shadow-lg flex items-center gap-2"
        style={{ backgroundColor: 'var(--color-surface)' }}
        title="Switch Layout"
      >
        <Layout className="w-4 h-4" />
        <span className="text-sm font-medium">Layouts</span>
      </button>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-40 w-80 bg-surface rounded-xl border border-gray-800/50 shadow-2xl flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
        <h3 className="text-sm font-semibold text-text">Layout Presets</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-text-secondary hover:text-text transition-colors"
        >
          ×
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {allPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleApplyPreset(preset.id)}
            className="w-full text-left p-3 rounded-lg hover:bg-surface/50 transition-colors mb-2 group"
          >
            <div className="flex items-start gap-3">
              <div className={cn('mt-0.5', getCategoryColor(preset.category))}>
                {getCategoryIcon(preset.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-text">{preset.icon} {preset.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent uppercase">
                    {preset.category}
                  </span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">{preset.description}</p>
                <div className="mt-2 text-xs text-text-secondary">
                  {preset.widgets.length} widget{preset.widgets.length !== 1 ? 's' : ''}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-text transition-colors flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


