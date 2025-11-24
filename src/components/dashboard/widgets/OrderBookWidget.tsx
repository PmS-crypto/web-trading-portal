'use client';

import { Settings, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboardStore';

interface OrderBookWidgetProps {
  config: Record<string, any>;
  widgetId?: string;
}

// Mock data
const mockOrders = [
  { id: 1, symbol: 'RELIANCE', type: 'BUY', quantity: 10, price: 2450.50, status: 'EXECUTED' },
  { id: 2, symbol: 'TCS', type: 'SELL', quantity: 5, price: 3456.75, status: 'PENDING' },
  { id: 3, symbol: 'INFY', type: 'BUY', quantity: 20, price: 1523.40, status: 'EXECUTED' },
];

export function OrderBookWidget({ config, widgetId }: OrderBookWidgetProps) {
  const { removeWidget } = useDashboardStore();
  
  return (
    <div className="h-full w-full bg-surface rounded-xl border border-white/5 flex flex-col overflow-hidden" style={{ 
      backgroundColor: 'var(--color-surface)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 flex-shrink-0 widget-header">
        <div className="flex items-center gap-2 min-w-0">
          <div className="text-sm font-semibold text-text truncate">Orders</div>
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

      {/* Orders Content */}
      <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
        <div className="divide-y divide-white/5">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="p-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between mb-2 gap-2 min-w-0">
                <div className="text-sm font-semibold text-text truncate">{order.symbol}</div>
                <div className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                  order.type === 'BUY'
                    ? 'bg-accent/20 text-accent'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {order.type}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary gap-2">
                <span className="whitespace-nowrap">Qty: {order.quantity}</span>
                <span className="whitespace-nowrap">{formatCurrency(order.price, 'INR')}</span>
              </div>
              <div className="mt-1 text-xs">
                <span className={`px-2 py-0.5 rounded ${
                  order.status === 'EXECUTED'
                    ? 'bg-accent/20 text-accent'
                    : order.status === 'PENDING'
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : 'bg-text-secondary/20 text-text-secondary'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
