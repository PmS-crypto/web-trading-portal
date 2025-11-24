'use client';

import { GripVertical, Settings, Maximize2, ExternalLink } from 'lucide-react';

interface NewsWidgetProps {
  config: Record<string, any>;
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

export function NewsWidget({ config }: NewsWidgetProps) {
  return (
    <div className="h-full w-full bg-surface rounded-xl border border-gray-800/50 flex flex-col overflow-hidden shadow-lg" style={{ 
      backgroundColor: 'var(--color-surface)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-4 h-4 text-text-secondary widget-drag-handle cursor-move flex-shrink-0" />
          <div className="text-sm font-semibold text-text truncate">Market News</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-1.5 rounded hover:bg-surface/50 transition-colors">
            <Settings className="w-4 h-4 text-text-secondary" />
          </button>
          <button className="p-1.5 rounded hover:bg-surface/50 transition-colors">
            <Maximize2 className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* News Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="divide-y divide-gray-800">
          {mockNews.map((news) => (
            <div
              key={news.id}
              className="p-3 hover:bg-surface/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text mb-1 line-clamp-2">
                    {news.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                  </div>
                </div>
                <button className="p-1 rounded hover:bg-surface/50 transition-colors flex-shrink-0">
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


