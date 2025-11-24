'use client';

import { Settings, X, ExternalLink } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';

interface NewsWidgetProps {
  config: Record<string, any>;
  widgetId?: string;
}

// Mock data
const mockNews = [
  {
    id: 1,
    title: 'GMBREW reports strong Q3 earnings',
    source: 'Economic Times',
    time: '2h ago',
    sentiment: 'positive',
  },
  {
    id: 2,
    title: 'NIFTY50 hits new all-time high',
    source: 'Moneycontrol',
    time: '4h ago',
    sentiment: 'positive',
  },
  {
    id: 3,
    title: 'Banking sector sees profit booking',
    source: 'Business Standard',
    time: '6h ago',
    sentiment: 'neutral',
  },
];

export function NewsWidget({ config, widgetId }: NewsWidgetProps) {
  const { removeWidget } = useDashboardStore();
  
  return (
    <div className="h-full w-full bg-surface rounded-xl border border-white/5 flex flex-col overflow-hidden" style={{ 
      backgroundColor: 'var(--color-surface)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 flex-shrink-0 widget-header">
        <div className="flex items-center gap-2 min-w-0">
          <div className="text-sm font-semibold text-text truncate">Market News</div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer">
            <Settings className="w-4 h-4 text-text-secondary" />
          </button>
          {widgetId && (
            <button 
              onClick={() => removeWidget(widgetId)}
              className="p-1.5 rounded hover:bg-red-500/20 transition-colors cursor-pointer"
              title="Remove widget"
            >
              <X className="w-4 h-4 text-text-secondary hover:text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* News Content */}
      <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
        <div className="divide-y divide-white/5">
          {mockNews.map((news) => (
            <div
              key={news.id}
              className="p-3 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 min-w-0">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="text-sm font-medium text-text mb-1 line-clamp-2">
                    {news.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary flex-wrap">
                    <span className="truncate">{news.source}</span>
                    <span>•</span>
                    <span className="whitespace-nowrap">{news.time}</span>
                  </div>
                </div>
                <button className="p-1 rounded hover:bg-white/5 transition-colors flex-shrink-0 cursor-pointer">
                  <ExternalLink className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
