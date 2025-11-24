'use client';

import { GripVertical, Settings, Maximize2, TrendingUp, Info } from 'lucide-react';
import { cn, getTrackkScoreColor, getTrackkScoreRating } from '@/lib/utils';

interface TrackkScoreWidgetProps {
  config: Record<string, any>;
}

// Mock data
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
    '73% positive sentiment',
    'High profit consistency',
    'Attractive valuation',
  ],
};

export function TrackkScoreWidget({ config }: TrackkScoreWidgetProps) {
  const { symbol, score, rating, breakdown, sources } = scoreData;
  const scoreColor = getTrackkScoreColor(score);
  const circumference = 2 * Math.PI * 44; // radius = 44 (for w-28 h-28)
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className="h-full w-full bg-surface rounded-xl border border-gray-800/50 flex flex-col overflow-hidden shadow-lg" style={{ 
      backgroundColor: 'var(--color-surface)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-4 h-4 text-text-secondary widget-drag-handle cursor-move flex-shrink-0" />
          <div className="text-sm font-semibold text-text truncate">Trackk Score</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-1.5 rounded hover:bg-surface/50 transition-colors" title="Learn more">
            <Info className="w-4 h-4 text-text-secondary" />
          </button>
          <button className="p-1.5 rounded hover:bg-surface/50 transition-colors">
            <Settings className="w-4 h-4 text-text-secondary" />
          </button>
          <button className="p-1.5 rounded hover:bg-surface/50 transition-colors">
            <Maximize2 className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Score Content */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center min-h-0 overflow-y-auto">
        <div className="mb-3 flex-shrink-0">
          <div className="text-sm text-text-secondary mb-1 truncate">{symbol}</div>
          <div className="text-xs text-text-secondary">Rating: {rating}</div>
        </div>

        {/* Circular Score Gauge */}
        <div className="relative w-28 h-28 mb-4 flex-shrink-0">
          <svg className="transform -rotate-90 w-28 h-28">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor={score >= 7 ? '#1BCF66' : score >= 5 ? '#FFB84D' : '#FF4757'} />
              </linearGradient>
            </defs>
            <circle
              cx="56"
              cy="56"
              r="44"
              stroke="var(--color-text-secondary)"
              strokeWidth="4"
              fill="none"
              opacity={0.2}
            />
            <circle
              cx="56"
              cy="56"
              r="44"
              stroke="url(#scoreGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              style={{ filter: 'drop-shadow(0 0 4px var(--color-accent))' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={cn('text-3xl font-bold', scoreColor)} style={{ 
                textShadow: '0 0 8px currentColor',
              }}>{score}</div>
              <div className="text-xs text-text-secondary mt-0.5">/10</div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="w-full space-y-1.5 flex-shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Technicals</span>
            <span className="text-text font-medium">{breakdown.technicals.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Sentiment</span>
            <span className="text-text font-medium">{breakdown.sentiment.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Fundamentals</span>
            <span className="text-text font-medium">{breakdown.fundamentals.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Social</span>
            <span className="text-text font-medium">{breakdown.social.toFixed(1)}</span>
          </div>
        </div>

        {/* Sources */}
        <div className="mt-4 pt-4 border-t border-gray-800 w-full">
          <div className="text-xs text-text-secondary mb-2">Key Factors:</div>
          <ul className="space-y-1">
            {sources.map((source, index) => (
              <li key={index} className="text-xs text-text-secondary flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-success" />
                {source}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


