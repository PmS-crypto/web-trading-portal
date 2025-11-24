'use client';

import { Flame, Calendar, TrendingUp } from 'lucide-react';

interface StreakData {
  research: number;
  trading: number;
  login: number;
  bestStreak: number;
}

interface StreakCounterProps {
  streaks: StreakData;
}

export function StreakCounter({ streaks }: StreakCounterProps) {
  return (
    <div className="bg-surface rounded-lg border border-gray-800 p-4" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-warning" />
        <h3 className="text-sm font-semibold text-text">Your Streaks</h3>
      </div>

      <div className="space-y-3">
        {/* Research Streak */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <div className="text-sm font-medium text-text">Research Streak</div>
              <div className="text-xs text-text-secondary">Daily stock research</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text flex items-center gap-1">
              <Flame className="w-5 h-5 text-warning" />
              {streaks.research}
            </div>
            <div className="text-xs text-text-secondary">days</div>
          </div>
        </div>

        {/* Trading Streak */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-sm font-medium text-text">Trading Streak</div>
              <div className="text-xs text-text-secondary">Consecutive profitable weeks</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">{streaks.trading}</div>
            <div className="text-xs text-text-secondary">weeks</div>
          </div>
        </div>

        {/* Login Streak */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-accent" style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <div className="text-sm font-medium text-text">Login Streak</div>
              <div className="text-xs text-text-secondary">Daily app opens</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">{streaks.login}</div>
            <div className="text-xs text-text-secondary">days</div>
          </div>
        </div>
      </div>

      {/* Best Streak */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Best Streak</span>
          <span className="text-lg font-bold text-text flex items-center gap-1">
            <Flame className="w-4 h-4 text-warning" />
            {streaks.bestStreak} days
          </span>
        </div>
      </div>
    </div>
  );
}


