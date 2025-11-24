'use client';

import { Settings, X, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn, formatCurrency, formatPercent, getColorForChange } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboardStore';

interface PortfolioWidgetProps {
  config: Record<string, any>;
  widgetId?: string;
}

// Mock data
const portfolioData = {
  totalValue: 1250000,
  dayChange: 12500,
  dayChangePercent: 1.01,
  holdings: [
    { name: 'RELIANCE', value: 500000, color: '#0052ff' }, // Coinbase blue
    { name: 'TCS', value: 300000, color: '#00d4ff' }, // Cyan blue
    { name: 'INFY', value: 250000, color: '#4a90e2' }, // Light blue
    { name: 'HDFCBANK', value: 200000, color: '#7b68ee' }, // Purple-blue
  ],
};

export function PortfolioWidget({ config, widgetId }: PortfolioWidgetProps) {
  const { removeWidget } = useDashboardStore();
  const { totalValue, dayChange, dayChangePercent, holdings } = portfolioData;

  return (
    <div className="h-full w-full bg-surface rounded-xl border border-white/5 flex flex-col overflow-hidden" style={{ 
      backgroundColor: 'var(--color-surface)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 flex-shrink-0 widget-header">
        <div className="flex items-center gap-2 min-w-0">
          <div className="text-sm font-semibold text-text truncate">Portfolio</div>
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

      {/* Portfolio Content */}
      <div className="flex-1 min-h-0 p-4 flex flex-col overflow-hidden">
        <div className="mb-3 flex-shrink-0">
          <div className="text-xl font-bold text-text mb-1 truncate">
            {formatCurrency(totalValue, 'INR')}
          </div>
          <div className={cn('text-sm font-medium flex items-center gap-1 flex-wrap', getColorForChange(dayChangePercent))}>
            {dayChangePercent >= 0 ? (
              <TrendingUp className="w-4 h-4 flex-shrink-0 text-accent" />
            ) : (
              <TrendingDown className="w-4 h-4 flex-shrink-0 text-red-500" />
            )}
            <span className="whitespace-nowrap">{formatPercent(dayChangePercent)}</span>
            <span className="text-text-secondary whitespace-nowrap">({formatCurrency(dayChange, 'INR')})</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 mb-3 overflow-hidden" style={{ minHeight: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart 
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <defs>
                {holdings.map((entry, index) => (
                  <linearGradient 
                    key={`gradient-${index}`} 
                    id={`portfolio-gradient-${widgetId || 'default'}-${index}`} 
                    x1="0" 
                    y1="0" 
                    x2="0" 
                    y2="1"
                  >
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.8}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={holdings}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => {
                  if (percent < 0.05) return '';
                  return `${name}\n${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius="75%"
                innerRadius="45%"
                fill="#8884d8"
                dataKey="value"
                paddingAngle={3}
                stroke="var(--color-bg)"
                strokeWidth={3}
              >
                {holdings.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#portfolio-gradient-${widgetId || 'default'}-${index})`}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  padding: '8px 12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                }}
                formatter={(value: number) => formatCurrency(value, 'INR')}
                labelStyle={{ color: 'var(--color-text-secondary)', fontSize: '12px', fontWeight: '500' }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-secondary)', paddingTop: '10px' }}
                iconType="circle"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2 flex-shrink-0 overflow-y-auto max-h-32 overscroll-contain">
          {holdings.map((holding) => (
            <div key={holding.name} className="flex items-center justify-between text-xs min-w-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: holding.color }}
                />
                <span className="text-text-secondary truncate">{holding.name}</span>
              </div>
              <span className="text-text font-medium whitespace-nowrap ml-2 text-xs">
                {formatCurrency(holding.value, 'INR')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
