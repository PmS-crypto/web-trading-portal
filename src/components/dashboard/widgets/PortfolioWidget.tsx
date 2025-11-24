'use client';

import { GripVertical, Settings, Maximize2, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn, formatCurrency, formatPercent, getColorForChange } from '@/lib/utils';

interface PortfolioWidgetProps {
  config: Record<string, any>;
}

// Mock data
const portfolioData = {
  totalValue: 1250000,
  dayChange: 12500,
  dayChangePercent: 1.01,
  holdings: [
    { name: 'RELIANCE', value: 500000, color: '#1890ff' },
    { name: 'TCS', value: 300000, color: '#1BCF66' },
    { name: 'INFY', value: 250000, color: '#FFB84D' },
    { name: 'HDFCBANK', value: 200000, color: '#FF4757' },
  ],
};

export function PortfolioWidget({ config }: PortfolioWidgetProps) {
  const { totalValue, dayChange, dayChangePercent, holdings } = portfolioData;

  return (
    <div className="h-full w-full bg-surface rounded-xl border border-gray-800/50 flex flex-col overflow-hidden shadow-lg" style={{ 
      backgroundColor: 'var(--color-surface)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-4 h-4 text-text-secondary widget-drag-handle cursor-move flex-shrink-0" />
          <div className="text-sm font-semibold text-text truncate">Portfolio</div>
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

      {/* Portfolio Content */}
      <div className="flex-1 p-4 flex flex-col min-h-0 overflow-hidden">
        <div className="mb-3 flex-shrink-0">
          <div className="text-xl font-bold text-text mb-1 truncate">
            {formatCurrency(totalValue, 'INR')}
          </div>
          <div className={cn('text-sm font-medium flex items-center gap-1', getColorForChange(dayChangePercent))}>
            {dayChangePercent >= 0 ? (
              <TrendingUp className="w-4 h-4 flex-shrink-0" />
            ) : (
              <TrendingDown className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="whitespace-nowrap">{formatPercent(dayChangePercent)}</span>
            <span className="text-text-secondary">({formatCurrency(dayChange, 'INR')})</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 mb-3" style={{ minHeight: '180px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {holdings.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.7}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={holdings}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => {
                  if (percent < 0.05) return ''; // Hide labels for small slices
                  return `${name}\n${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius="70%"
                innerRadius="40%"
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
                stroke="var(--color-bg)"
                strokeWidth={2}
              >
                {holdings.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient-${index})`}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-text-secondary)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  padding: '8px 12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => formatCurrency(value, 'INR')}
                labelStyle={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2 flex-shrink-0 overflow-y-auto">
          {holdings.map((holding) => (
            <div key={holding.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: holding.color }}
                />
                <span className="text-text-secondary truncate">{holding.name}</span>
              </div>
              <span className="text-text font-medium whitespace-nowrap ml-2">
                {formatCurrency(holding.value, 'INR')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


