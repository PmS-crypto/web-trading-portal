'use client';

import { useState } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import { DashboardWidget } from '@/types';
import { useDashboardStore } from '@/store/dashboardStore';

interface WidgetSettingsPanelProps {
  widget: DashboardWidget;
  onClose: () => void;
}

export function WidgetSettingsPanel({ widget, onClose }: WidgetSettingsPanelProps) {
  const { updateWidget } = useDashboardStore();
  const [config, setConfig] = useState(widget.config);

  const handleSave = () => {
    updateWidget(widget.id, { config });
    onClose();
  };

  const handleReset = () => {
    setConfig(widget.config);
  };

  const renderSettings = () => {
    switch (widget.type) {
      case 'chart':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Symbol
              </label>
              <input
                type="text"
                value={config.symbol || ''}
                onChange={(e) => setConfig({ ...config, symbol: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-gray-800/50 text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="NIFTY"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Interval
              </label>
              <select
                value={config.interval || '1d'}
                onChange={(e) => setConfig({ ...config, interval: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-gray-800/50 text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="1m">1 Minute</option>
                <option value="5m">5 Minutes</option>
                <option value="15m">15 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="1d">1 Day</option>
                <option value="1w">1 Week</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Indicators
              </label>
              <div className="space-y-2">
                {['RSI', 'MACD', 'Bollinger Bands', 'Moving Average'].map((indicator) => (
                  <label key={indicator} className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(config.indicators || []).includes(indicator)}
                      onChange={(e) => {
                        const indicators = config.indicators || [];
                        if (e.target.checked) {
                          setConfig({ ...config, indicators: [...indicators, indicator] });
                        } else {
                          setConfig({ ...config, indicators: indicators.filter((i: string) => i !== indicator) });
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-800/50 bg-surface text-accent focus:ring-accent"
                    />
                    <span>{indicator}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showVolume ?? true}
                  onChange={(e) => setConfig({ ...config, showVolume: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-800/50 bg-surface text-accent focus:ring-accent"
                />
                <span>Show Volume</span>
              </label>
            </div>
          </div>
        );
      
      case 'watchlist':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Watchlist Name
              </label>
              <input
                type="text"
                value={config.name || ''}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-gray-800/50 text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="My Watchlist"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Sort By
              </label>
              <select
                value={config.sortBy || 'changePercent'}
                onChange={(e) => setConfig({ ...config, sortBy: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-gray-800/50 text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="changePercent">Change %</option>
                <option value="price">Price</option>
                <option value="volume">Volume</option>
                <option value="symbol">Symbol</option>
              </select>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-sm text-text-secondary">
            No additional settings available for this widget type.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-xl border border-gray-800/50 shadow-2xl flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50 flex-shrink-0">
          <h2 className="text-lg font-semibold text-text">Widget Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {renderSettings()}
        </div>
        
        <div className="flex items-center gap-2 p-4 border-t border-gray-800/50 flex-shrink-0">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 rounded-lg bg-surface border border-gray-800/50 text-text-secondary hover:text-text hover:bg-surface/80 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

