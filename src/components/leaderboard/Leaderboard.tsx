'use client';

import { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Medal, Crown, Award } from 'lucide-react';
import { LeaderboardEntry } from '@/types';
import { formatPercent } from '@/lib/utils';

interface LeaderboardProps {
  period?: 'daily' | 'weekly' | 'monthly';
  type?: 'global' | 'friends' | 'squad';
}

// Mock data
const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: '1',
    username: 'Arvind Kumar',
    trackkScore: 8.5,
    portfolioReturn: 12.3,
    rank: 1,
    badges: ['elite', 'analyst'],
    streak: 15,
  },
  {
    userId: '2',
    username: 'Priya Sharma',
    trackkScore: 8.2,
    portfolioReturn: 11.1,
    rank: 2,
    badges: ['trader', 'consistent'],
    streak: 12,
  },
  {
    userId: '3',
    username: 'Rahul Patel',
    trackkScore: 7.9,
    portfolioReturn: 10.2,
    rank: 3,
    badges: ['researcher'],
    streak: 8,
  },
  {
    userId: '4',
    username: 'You',
    trackkScore: 7.2,
    portfolioReturn: 6.8,
    rank: 5,
    badges: ['trader'],
    streak: 7,
  },
];

const badgeIcons: Record<string, any> = {
  elite: Crown,
  analyst: Award,
  trader: TrendingUp,
  consistent: Medal,
  researcher: Trophy,
};

export function Leaderboard({ period = 'weekly', type = 'global' }: LeaderboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(period);
  const [selectedType, setSelectedType] = useState(type);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-sm text-text-secondary">#{rank}</span>;
    }
  };

  return (
    <div className="h-full w-full bg-surface rounded-lg border border-gray-800/50 flex flex-col" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" style={{ color: 'var(--color-accent)' }} />
            <h2 className="text-lg font-semibold text-text">Leaderboard</h2>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-2 mb-4">
          {(['daily', 'weekly', 'monthly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === p
                  ? 'bg-accent text-white'
                  : 'bg-surface/50 text-text-secondary hover:bg-surface hover:text-text'
              }`}
              style={
                selectedPeriod === p
                  ? { backgroundColor: 'var(--color-accent)' }
                  : { backgroundColor: 'rgba(255,255,255,0.05)' }
              }
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Type Selector */}
        <div className="flex items-center gap-2">
          {(['global', 'friends', 'squad'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedType === t
                  ? 'bg-accent/20 text-accent border border-accent'
                  : 'bg-surface/50 text-text-secondary hover:bg-surface hover:text-text border border-transparent'
              }`}
              style={
                selectedType === t
                  ? { backgroundColor: 'rgba(24, 144, 255, 0.2)', borderColor: 'var(--color-accent)' }
                  : { backgroundColor: 'rgba(255,255,255,0.05)' }
              }
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-800">
          {mockLeaderboard.map((entry) => {
            const isCurrentUser = entry.userId === '4';
            return (
              <div
                key={entry.userId}
                className={`p-4 hover:bg-surface/30 transition-colors ${
                  isCurrentUser ? 'bg-accent/10 border-l-2 border-accent' : ''
                }`}
                style={
                  isCurrentUser
                    ? { backgroundColor: 'rgba(24, 144, 255, 0.1)', borderLeftColor: 'var(--color-accent)' }
                    : {}
                }
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="w-10 flex items-center justify-center">
                    {getRankIcon(entry.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                    {entry.username[0].toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-semibold ${isCurrentUser ? 'text-accent' : 'text-text'}`}>
                        {entry.username}
                      </span>
                      {isCurrentUser && (
                        <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {entry.badges.map((badge) => {
                        const BadgeIcon = badgeIcons[badge] || Award;
                        return (
                          <div
                            key={badge}
                            className="flex items-center gap-1 text-xs text-text-secondary"
                            title={badge}
                          >
                            <BadgeIcon className="w-3 h-3" />
                            <span className="capitalize">{badge}</span>
                          </div>
                        );
                      })}
                      <span className="text-xs text-text-secondary">
                        🔥 {entry.streak} day streak
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-text">
                        Trackk Score: {entry.trackkScore.toFixed(1)}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        entry.portfolioReturn >= 0 ? 'text-success' : 'text-danger'
                      }`}
                    >
                      {entry.portfolioReturn >= 0 ? (
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 inline mr-1" />
                      )}
                      {formatPercent(entry.portfolioReturn)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800/50 text-center">
        <p className="text-xs text-text-secondary">
          Rankings update every hour • Your rank: #{mockLeaderboard.find(e => e.userId === '4')?.rank}
        </p>
      </div>
    </div>
  );
}


