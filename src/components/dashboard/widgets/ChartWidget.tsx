'use client';

import { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn, formatCurrency, getColorForChange } from '@/lib/utils';
import { useWebSocket } from '@/hooks/useWebSocket';
import { WebSocketMessage } from '@/lib/websocket';
import { useWidgetSettingsStore } from '@/store/widgetSettingsStore';
import { useDashboardStore } from '@/store/dashboardStore';

interface ChartWidgetProps {
  config: Record<string, any>;
  widgetId?: string;
}

// Mock data - replace with real API data
const mockData = [
  { time: '09:30', price: 15000 },
  { time: '10:00', price: 15100 },
  { time: '10:30', price: 15050 },
  { time: '11:00', price: 15200 },
  { time: '11:30', price: 15150 },
  { time: '12:00', price: 15300 },
  { time: '12:30', price: 15250 },
  { time: '13:00', price: 15400 },
];

export function ChartWidget({ config, widgetId }: ChartWidgetProps) {
  const { openSettings } = useWidgetSettingsStore();
  const { removeWidget } = useDashboardStore();
  const [symbol] = useState(config.symbol || 'NIFTY');
  const [interval] = useState(config.interval || '1d');
  const [currentPrice, setCurrentPrice] = useState(mockData[mockData.length - 1].price);
  const [priceData, setPriceData] = useState(mockData);

  // Subscribe to real-time price updates
  useWebSocket((message: WebSocketMessage) => {
    if (message.type === 'price_update' && message.symbol === symbol) {
      setCurrentPrice(message.price);
      // Update chart data
      setPriceData(prev => [
        ...prev.slice(1),
        { time: new Date().toLocaleTimeString(), price: message.price },
      ]);
    }
  }, [symbol]);

  const change = currentPrice - mockData[0].price;
  const changePercent = (change / mockData[0].price) * 100;

  return (
    <div className="h-full w-full bg-surface rounded-xl border border-white/5 flex flex-col overflow-hidden" style={{ 
      backgroundColor: 'var(--color-surface)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 flex-shrink-0 widget-header">
        <div className="flex items-center gap-2 min-w-0">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-text truncate">{symbol}</div>
            <div className="text-xs text-text-secondary">{interval}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button 
            onClick={() => widgetId && openSettings(widgetId)}
            className="p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title="Settings"
          >
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

      {/* Chart Content */}
      <div className="flex-1 min-h-0 p-4 flex flex-col overflow-hidden">
        <div className="mb-3 flex-shrink-0">
          <div className="text-lg sm:text-xl font-bold text-text mb-1 truncate">
            {formatCurrency(currentPrice, 'INR')}
          </div>
          <div className={cn('text-xs sm:text-sm font-medium flex items-center gap-1 flex-wrap', getColorForChange(change))}>
            {change >= 0 ? (
              <span className="text-accent">↗</span>
            ) : (
              <span className="text-red-500">↘</span>
            )}
            <span className="whitespace-nowrap">{change >= 0 ? '+' : ''}{formatCurrency(change, 'INR')}</span>
            <span className="text-text-secondary whitespace-nowrap">({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)</span>
          </div>
        </div>
        
        <div className="flex-1 min-h-0 w-full overflow-hidden" style={{ minHeight: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={priceData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id={`priceGradient-${widgetId || 'default'}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--color-text-secondary)"
                opacity={0.1}
              />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                axisLine={{ stroke: 'var(--color-text-secondary)', opacity: 0.2 }}
                tickLine={{ stroke: 'var(--color-text-secondary)', opacity: 0.2 }}
              />
              <YAxis 
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                axisLine={{ stroke: 'var(--color-text-secondary)', opacity: 0.2 }}
                tickLine={{ stroke: 'var(--color-text-secondary)', opacity: 0.2 }}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  padding: '8px 12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                }}
                labelStyle={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}
                formatter={(value: number) => formatCurrency(value, 'INR')}
              />
              <Area
                type="monotone"
                dataKey="price"
                fill={`url(#priceGradient-${widgetId || 'default'})`}
                stroke="var(--color-accent)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: 'var(--color-accent)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
