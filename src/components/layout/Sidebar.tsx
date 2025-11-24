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
        'relative flex flex-col bg-surface border-r border-gray-800/50 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Logo Section - Contains logo when expanded, toggle button when collapsed */}
      <div className="p-4 border-b border-gray-800/50 relative">
        {isCollapsed ? (
          // Toggle button in logo position when collapsed
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-full flex items-center justify-center w-8 h-8 rounded-lg bg-accent hover:bg-accent/90 transition-all hover:scale-110 shadow-md"
            style={{ backgroundColor: 'var(--color-accent)' }}
            title="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        ) : (
          // Logo and toggle button when expanded
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text flex-1">Trackk</span>
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-6 h-6 rounded-full bg-accent/20 hover:bg-accent/30 flex items-center justify-center transition-colors"
              style={{ color: 'var(--color-accent)' }}
              title="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
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
      <div className="p-4 border-t border-gray-800/50">
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


