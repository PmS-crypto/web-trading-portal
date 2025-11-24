'use client';

import { useState } from 'react';
import { Settings, X, TrendingUp, Info, ChevronDown, ChevronUp, ExternalLink, BarChart3, FileText, TrendingDown } from 'lucide-react';
import { cn, getTrackkScoreColor } from '@/lib/utils';
import { useUserPreferencesStore } from '@/store/userPreferencesStore';
import { useDashboardStore } from '@/store/dashboardStore';

interface TrackkScoreWidgetProps {
  config: Record<string, any>;
  widgetId?: string;
}

// Enhanced mock data with full transparency
const scoreData = {
  symbol: 'GMBREW',
  score: 8,
  rating: 'bullish' as const,
  breakdown: {
    technicals: 8.5,
    sentiment: 7.8,
    fundamentals: 8.2,
    social: 7.5,
  },
  sources: [
    { 
      type: 'sentiment',
      label: '73% positive sentiment',
      source: 'Twitter/X Analysis',
      confidence: 0.85,
      link: '#',
    },
    { 
      type: 'fundamentals',
      label: 'High profit consistency',
      source: 'Financial Reports Q3 2024',
      confidence: 0.92,
      link: '#',
    },
    { 
      type: 'valuation',
      label: 'Attractive valuation',
      source: 'DCF Model Analysis',
      confidence: 0.78,
      link: '#',
    },
  ],
  detailedBreakdown: {
    technicals: {
      value: 8.5,
      factors: [
        { name: 'RSI', value: 8.2, trend: 'up' },
        { name: 'MACD', value: 8.8, trend: 'up' },
        { name: 'Moving Averages', value: 8.5, trend: 'up' },
      ],
    },
    sentiment: {
      value: 7.8,
      factors: [
        { name: 'Social Media', value: 7.5, trend: 'up' },
        { name: 'News Sentiment', value: 8.1, trend: 'up' },
        { name: 'Analyst Ratings', value: 7.8, trend: 'neutral' },
      ],
    },
    fundamentals: {
      value: 8.2,
      factors: [
        { name: 'Revenue Growth', value: 8.5, trend: 'up' },
        { name: 'Profit Margins', value: 8.0, trend: 'up' },
        { name: 'Debt Ratio', value: 8.1, trend: 'up' },
      ],
    },
    social: {
      value: 7.5,
      factors: [
        { name: 'Community Sentiment', value: 7.3, trend: 'up' },
        { name: 'Influencer Mentions', value: 7.8, trend: 'up' },
        { name: 'Discussion Volume', value: 7.4, trend: 'up' },
      ],
    },
  },
  lastUpdated: new Date(),
};

export function TrackkScoreWidget({ config, widgetId }: TrackkScoreWidgetProps) {
  const { preferences } = useUserPreferencesStore();
  const { removeWidget } = useDashboardStore();
  const [showBreakdown, setShowBreakdown] = useState(preferences.showScoreBreakdown);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const { symbol, score, rating, breakdown, sources, detailedBreakdown } = scoreData;
  const scoreColor = getTrackkScoreColor(score);
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (score / 10) * circumference;

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="h-full w-full bg-surface rounded-xl border border-white/5 flex flex-col overflow-hidden" style={{ 
      backgroundColor: 'var(--color-surface)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 flex-shrink-0 widget-header">
        <div className="flex items-center gap-2 min-w-0">
          <div className="text-sm font-semibold text-text truncate">Trackk Score</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer" 
            title={showBreakdown ? 'Hide breakdown' : 'Show breakdown'}
          >
            <BarChart3 className="w-4 h-4 text-text-secondary" />
          </button>
          <div className="p-1.5 cursor-default">
            <Info className="w-4 h-4 text-text-secondary/50" />
          </div>
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

      {/* Score Content */}
      <div className="flex-1 min-h-0 p-4 flex flex-col items-center justify-start overflow-y-auto overscroll-contain">
        <div className="mb-3 flex-shrink-0 text-center w-full">
          <div className="text-sm text-text-secondary mb-1 truncate">{symbol}</div>
          <div className="text-xs text-text-secondary">Rating: <span className={cn('font-medium', scoreColor)}>{rating}</span></div>
        </div>

        {/* Circular Score Gauge */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 flex-shrink-0">
          <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 112 112">
            <defs>
              <linearGradient id={`scoreGradient-${widgetId || 'default'}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor={score >= 7 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444'} />
              </linearGradient>
            </defs>
            <circle
              cx="56"
              cy="56"
              r="44"
              stroke="var(--color-text-secondary)"
              strokeWidth="4"
              fill="none"
              style={{ 
                opacity: 'var(--bg-opacity, 0.2)',
              }}
              className="dark:opacity-20 light:opacity-15"
            />
            <circle
              cx="56"
              cy="56"
              r="44"
              stroke={`url(#scoreGradient-${widgetId || 'default'})`}
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              style={{ 
                filter: 'drop-shadow(0 0 4px var(--color-accent))',
                opacity: 1,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={cn('text-2xl sm:text-3xl font-bold', scoreColor)} style={{ 
                textShadow: '0 0 8px currentColor',
                color: 'var(--color-accent)',
              }}>{score}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>/10</div>
            </div>
          </div>
        </div>

        {/* Quick Breakdown */}
        <div className="w-full space-y-2 flex-shrink-0 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Technicals</span>
            <div className="flex items-center gap-2">
              <span className="text-text font-medium">{breakdown.technicals.toFixed(1)}</span>
              <TrendingUp className="w-3 h-3 text-accent" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Sentiment</span>
            <div className="flex items-center gap-2">
              <span className="text-text font-medium">{breakdown.sentiment.toFixed(1)}</span>
              <TrendingUp className="w-3 h-3 text-accent" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Fundamentals</span>
            <div className="flex items-center gap-2">
              <span className="text-text font-medium">{breakdown.fundamentals.toFixed(1)}</span>
              <TrendingUp className="w-3 h-3 text-accent" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Social</span>
            <div className="flex items-center gap-2">
              <span className="text-text font-medium">{breakdown.social.toFixed(1)}</span>
              <TrendingUp className="w-3 h-3 text-accent" />
            </div>
          </div>
        </div>

        {/* Detailed Breakdown - Expandable */}
        {showBreakdown && (
          <div className="w-full space-y-2 mb-4 border-t border-white/5 pt-4">
            {Object.entries(detailedBreakdown).map(([category, data]) => (
              <div key={category} className="space-y-1.5">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between text-xs font-medium text-text hover:bg-white/5 p-1.5 rounded transition-colors cursor-pointer"
                >
                  <span className="capitalize">{category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary">{data.value.toFixed(1)}</span>
                    {expandedCategory === category ? (
                      <ChevronUp className="w-3 h-3 text-text-secondary" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-text-secondary" />
                    )}
                  </div>
                </button>
                {expandedCategory === category && (
                  <div className="pl-3 space-y-1">
                    {data.factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-text-secondary">
                        <span>{factor.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-text">{factor.value.toFixed(1)}</span>
                          {factor.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-accent" />
                          ) : factor.trend === 'down' ? (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Sources with Attribution */}
        {preferences.showSourceAttribution && (
          <div className="mt-4 pt-4 border-t border-white/5 w-full">
            <div className="text-xs font-medium text-text-secondary mb-2 flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Source Attribution:
            </div>
            <ul className="space-y-2">
              {sources.map((source, index) => (
                <li key={index} className="text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-text-secondary flex items-center gap-1 mb-0.5">
                        <TrendingUp className="w-3 h-3 text-accent flex-shrink-0" />
                        <span className="truncate">{source.label}</span>
                      </div>
                      <div className="text-text-secondary/70 text-[10px] ml-4">
                        {source.source}
                      </div>
                      <div className="text-text-secondary/60 text-[10px] ml-4 mt-0.5">
                        Confidence: {(source.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                    <a
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-surface/50 transition-colors flex-shrink-0"
                      title="View source"
                    >
                      <ExternalLink className="w-3 h-3 text-text-secondary" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
