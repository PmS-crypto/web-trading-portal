'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Star, 
  Newspaper, 
  List,
  X
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardWidget } from '@/types';

const widgetTypes = [
  { type: 'chart', label: 'Chart', icon: BarChart3, description: 'Advanced price charts' },
  { type: 'watchlist', label: 'Watchlist', icon: TrendingUp, description: 'Stock watchlist' },
  { type: 'portfolio', label: 'Portfolio', icon: Wallet, description: 'Portfolio overview' },
  { type: 'score', label: 'Trackk Score', icon: Star, description: 'AI sentiment score' },
  { type: 'news', label: 'News', icon: Newspaper, description: 'Market news feed' },
  { type: 'orderbook', label: 'Order Book', icon: List, description: 'Live order book' },
];

export function WidgetPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const { addWidget } = useDashboardStore();

  const handleAddWidget = (type: DashboardWidget['type']) => {
    const newWidget: DashboardWidget = {
      id: `widget-${Date.now()}`,
      type,
      position: {
        x: 0,
        y: 0,
        w: 4,
        h: 4,
      },
      config: {},
      isPinned: false,
    };
    addWidget(newWidget);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:bg-accent/90 transition-all hover:scale-110 flex items-center justify-center z-50"
        style={{ backgroundColor: 'var(--color-accent)' }}
        title="Add Widget"
      >
        <BarChart3 className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-surface border border-gray-700 rounded-xl shadow-2xl z-50 p-4" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">Add Widget</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded hover:bg-surface/50 transition-colors"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {widgetTypes.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              onClick={() => {
                handleAddWidget(item.type as DashboardWidget['type']);
                setIsOpen(false);
              }}
              className="p-4 rounded-lg border border-gray-700 hover:border-accent hover:bg-surface/50 transition-all text-left group"
            >
              <Icon className="w-6 h-6 text-accent mb-2" style={{ color: 'var(--color-accent)' }} />
              <div className="text-sm font-medium text-text mb-1">{item.label}</div>
              <div className="text-xs text-text-secondary">{item.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


