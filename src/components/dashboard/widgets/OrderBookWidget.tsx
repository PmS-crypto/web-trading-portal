'use client';

import { GripVertical, Settings, Maximize2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface OrderBookWidgetProps {
  config: Record<string, any>;
}

// Mock data
const mockOrders = [
  { id: 1, symbol: 'RELIANCE', type: 'BUY', quantity: 10, price: 2450.50, status: 'EXECUTED' },
  { id: 2, symbol: 'TCS', type: 'SELL', quantity: 5, price: 3456.75, status: 'PENDING' },
  { id: 3, symbol: 'INFY', type: 'BUY', quantity: 20, price: 1523.40, status: 'EXECUTED' },
];

export function OrderBookWidget({ config }: OrderBookWidgetProps) {
  return (
    <div className="h-full w-full bg-surface rounded-xl border border-gray-800/50 flex flex-col overflow-hidden shadow-lg" style={{ 
      backgroundColor: 'var(--color-surface)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800/50 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-4 h-4 text-text-secondary widget-drag-handle cursor-move flex-shrink-0" />
          <div className="text-sm font-semibold text-text truncate">Orders</div>
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

      {/* Orders Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="divide-y divide-gray-800">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="p-3 hover:bg-surface/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-text">{order.symbol}</div>
                <div className={`text-xs px-2 py-0.5 rounded ${
                  order.type === 'BUY'
                    ? 'bg-success/20 text-success'
                    : 'bg-danger/20 text-danger'
                }`}>
                  {order.type}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>Qty: {order.quantity}</span>
                <span>{formatCurrency(order.price, 'INR')}</span>
              </div>
              <div className="mt-1 text-xs">
                <span className={`px-2 py-0.5 rounded ${
                  order.status === 'EXECUTED'
                    ? 'bg-success/20 text-success'
                    : order.status === 'PENDING'
                    ? 'bg-warning/20 text-warning'
                    : 'bg-gray-700 text-gray-400'
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


