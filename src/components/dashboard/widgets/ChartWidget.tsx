'use client';

import { useState, useEffect } from 'react';
import { GripVertical, Settings, Maximize2 } from 'lucide-react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn, formatCurrency, getColorForChange } from '@/lib/utils';
import { useWebSocket } from '@/hooks/useWebSocket';
import { WebSocketMessage } from '@/lib/websocket';

interface ChartWidgetProps {
  config: Record<string, any>;
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

export function ChartWidget({ config }: ChartWidgetProps) {
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
    <div className="h-full w-full bg-surface rounded-xl border border-gray-800/50 flex flex-col overflow-hidden shadow-lg" style={{ 
      backgroundColor: 'var(--color-surface)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800/50 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-4 h-4 text-text-secondary widget-drag-handle cursor-move flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-text truncate">{symbol}</div>
            <div className="text-xs text-text-secondary">{interval}</div>
          </div>
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

      {/* Chart Content */}
      <div className="flex-1 p-4 min-h-0 flex flex-col">
        <div className="mb-3 flex-shrink-0">
          <div className="text-2xl font-bold text-text mb-1 truncate">
            {formatCurrency(currentPrice, 'INR')}
          </div>
          <div className={cn('text-sm font-medium flex items-center gap-1', getColorForChange(change))}>
            {change >= 0 ? (
              <span className="text-success">↗</span>
            ) : (
              <span className="text-danger">↘</span>
            )}
            <span>{change >= 0 ? '+' : ''}{formatCurrency(change, 'INR')}</span>
            <span className="text-text-secondary">({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)</span>
          </div>
        </div>
        
        <div className="flex-1 min-h-0 w-full" style={{ minHeight: '150px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={priceData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--color-text-secondary)"
                opacity={0.2}
              />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                axisLine={{ stroke: 'var(--color-text-secondary)', opacity: 0.3 }}
                tickLine={{ stroke: 'var(--color-text-secondary)', opacity: 0.3 }}
              />
              <YAxis 
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                axisLine={{ stroke: 'var(--color-text-secondary)', opacity: 0.3 }}
                tickLine={{ stroke: 'var(--color-text-secondary)', opacity: 0.3 }}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-text-secondary)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  padding: '8px 12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}
                formatter={(value: number) => formatCurrency(value, 'INR')}
              />
              <Area
                type="monotone"
                dataKey="price"
                fill="url(#priceGradient)"
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

