'use client';

import { Settings, X, TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatCurrency, formatPercent, getColorForChange } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboardStore';

interface WatchlistWidgetProps {
  config: Record<string, any>;
  widgetId?: string;
}

// Mock data
const mockStocks = [
  { symbol: 'RELIANCE', price: 2450.50, change: 12.30, changePercent: 0.50 },
  { symbol: 'TCS', price: 3456.75, change: -15.25, changePercent: -0.44 },
  { symbol: 'INFY', price: 1523.40, change: 8.90, changePercent: 0.59 },
  { symbol: 'HDFCBANK', price: 1650.20, change: -5.10, changePercent: -0.31 },
  { symbol: 'ICICIBANK', price: 980.60, change: 4.20, changePercent: 0.43 },
];

export function WatchlistWidget({ config, widgetId }: WatchlistWidgetProps) {
  const { removeWidget } = useDashboardStore();
  
  return (
    <div className="h-full w-full bg-surface rounded-xl border border-white/5 flex flex-col overflow-hidden" style={{ 
      backgroundColor: 'var(--color-surface)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 flex-shrink-0 widget-header">
        <div className="flex items-center gap-2 min-w-0">
          <div className="text-sm font-semibold text-text truncate">Watchlist</div>
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

      {/* Watchlist Content */}
      <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
        <div className="divide-y divide-white/5">
          {mockStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="p-3 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 min-w-0">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="text-sm font-semibold text-text truncate">{stock.symbol}</div>
                  <div className="text-xs text-text-secondary mt-0.5 truncate">
                    {formatCurrency(stock.price, 'INR')}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={cn('text-right', getColorForChange(stock.changePercent))}>
                    <div className="text-sm font-medium flex items-center gap-1 justify-end">
                      {stock.changePercent >= 0 ? (
                        <TrendingUp className="w-3 h-3 flex-shrink-0 text-accent" />
                      ) : (
                        <TrendingDown className="w-3 h-3 flex-shrink-0 text-red-500" />
                      )}
                      <span className="whitespace-nowrap">{formatPercent(stock.changePercent)}</span>
                    </div>
                    <div className="text-xs text-text-secondary whitespace-nowrap">
                      {stock.change >= 0 ? '+' : ''}{formatCurrency(stock.change, 'INR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
