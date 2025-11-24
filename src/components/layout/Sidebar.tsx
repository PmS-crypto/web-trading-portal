'use client';

import { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  Search, 
  BarChart3, 
  Wallet, 
  Trophy, 
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Users,
  Zap
} from 'lucide-react';
import { useWatchlistStore } from '@/store/watchlistStore';
import { useNavigationStore } from '@/store/navigationStore';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'watchlists', label: 'Watchlists', icon: TrendingUp },
  { id: 'screeners', label: 'Screeners', icon: Search },
  { id: 'portfolio', label: 'Portfolio', icon: Wallet },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'squads', label: 'Squads', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentView, setView } = useNavigationStore();
  const { watchlists } = useWatchlistStore();

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-surface border-r border-gray-800 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 z-10 w-6 h-6 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-white">Trackk</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setView(item.id as any)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                    isActive
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : 'text-text-secondary hover:bg-surface/50 hover:text-text border border-transparent'
                  )}
                  style={{
                    backgroundColor: isActive ? 'rgba(24, 144, 255, 0.2)' : 'transparent',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    borderColor: isActive ? 'var(--color-accent)' : 'transparent',
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Watchlists Section */}
        {!isCollapsed && watchlists.length > 0 && (
          <div className="mt-6">
            <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Watchlists
            </div>
            <ul className="space-y-1">
              {watchlists.map((watchlist) => (
                <li key={watchlist.id}>
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface/50 hover:text-text transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="truncate">{watchlist.name}</span>
                    {watchlist.isShared && (
                      <Users className="w-3 h-3 ml-auto" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text truncate">User</div>
              <div className="text-xs text-text-secondary">Level 3</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}


