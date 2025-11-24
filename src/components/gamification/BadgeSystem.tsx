'use client';

import { Trophy, Award, Crown, Star, Target, TrendingUp, BookOpen, Users, Zap } from 'lucide-react';
import { User } from '@/types';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const badgeDefinitions: Badge[] = [
  {
    id: 'researcher',
    name: 'Researcher',
    description: 'Research 50 stocks',
    icon: BookOpen,
    rarity: 'common',
    unlocked: true,
    progress: 47,
    maxProgress: 50,
  },
  {
    id: 'trader',
    name: 'Trader',
    description: 'Place 10 trades',
    icon: TrendingUp,
    rarity: 'common',
    unlocked: true,
    progress: 10,
    maxProgress: 10,
  },
  {
    id: 'analyst',
    name: 'Analyst',
    description: 'Correctly predict 5 stock movements',
    icon: Target,
    rarity: 'rare',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: 'diversifier',
    name: 'Diversifier',
    description: 'Hold stocks in 5 different sectors',
    icon: Users,
    rarity: 'rare',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: 'consistent',
    name: 'Consistent',
    description: '6 out of 8 weeks with positive P&L',
    icon: Star,
    rarity: 'epic',
    unlocked: true,
    progress: 6,
    maxProgress: 8,
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Portfolio value over ₹10L',
    icon: Crown,
    rarity: 'epic',
    unlocked: false,
    progress: 8.2,
    maxProgress: 10,
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: '30 day research streak',
    icon: Zap,
    rarity: 'legendary',
    unlocked: false,
    progress: 7,
    maxProgress: 30,
  },
];

const rarityColors = {
  common: 'text-gray-400 border-gray-600',
  rare: 'text-blue-400 border-blue-600',
  epic: 'text-purple-400 border-purple-600',
  legendary: 'text-yellow-400 border-yellow-600',
};

const rarityBgColors = {
  common: 'bg-gray-900/50',
  rare: 'bg-blue-900/20',
  epic: 'bg-purple-900/20',
  legendary: 'bg-yellow-900/20',
};

export function BadgeSystem({ user }: { user?: User }) {
  const badges = badgeDefinitions;

  return (
    <div className="h-full w-full bg-surface rounded-lg border border-gray-800 flex flex-col" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-accent" style={{ color: 'var(--color-accent)' }} />
          <h2 className="text-lg font-semibold text-text">Achievements</h2>
        </div>
        <p className="text-sm text-text-secondary">
          {badges.filter(b => b.unlocked).length} of {badges.length} badges unlocked
        </p>
      </div>

      {/* Badges Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            const rarity = rarityColors[badge.rarity];
            const bgRarity = rarityBgColors[badge.rarity];
            const progressPercent = badge.progress && badge.maxProgress
              ? (badge.progress / badge.maxProgress) * 100
              : badge.unlocked ? 100 : 0;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  badge.unlocked
                    ? `${rarity} ${bgRarity} border-opacity-50`
                    : 'border-gray-700 bg-surface/30 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      badge.unlocked ? 'bg-accent/20' : 'bg-gray-800'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        badge.unlocked ? 'text-accent' : 'text-gray-600'
                      }`}
                      style={badge.unlocked ? { color: 'var(--color-accent)' } : {}}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-semibold ${badge.unlocked ? 'text-text' : 'text-text-secondary'}`}>
                        {badge.name}
                      </h3>
                      {badge.unlocked && (
                        <Award className="w-4 h-4 text-accent" style={{ color: 'var(--color-accent)' }} />
                      )}
                    </div>
                    <p className="text-xs text-text-secondary">{badge.description}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                        <span className="capitalize">{badge.rarity}</span>
                        {badge.progress !== undefined && badge.maxProgress !== undefined && (
                          <span>
                            {badge.progress}/{badge.maxProgress}
                          </span>
                        )}
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            badge.unlocked ? 'bg-accent' : 'bg-gray-700'
                          }`}
                          style={{
                            width: `${progressPercent}%`,
                            backgroundColor: badge.unlocked ? 'var(--color-accent)' : undefined,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="p-4 border-t border-gray-800">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-text mb-1">
              {badges.filter(b => b.unlocked).length}
            </div>
            <div className="text-xs text-text-secondary">Unlocked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text mb-1">
              {badges.filter(b => b.rarity === 'legendary' && b.unlocked).length}
            </div>
            <div className="text-xs text-text-secondary">Legendary</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text mb-1">
              {Math.round(
                (badges.reduce((acc, b) => {
                  if (b.progress && b.maxProgress) {
                    return acc + (b.progress / b.maxProgress);
                  }
                  return acc + (b.unlocked ? 1 : 0);
                }, 0) / badges.length) * 100
              )}%
            </div>
            <div className="text-xs text-text-secondary">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}


