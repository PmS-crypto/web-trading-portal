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
import { useThemeStore } from '@/store/themeStore';
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
  const { currentTheme } = useThemeStore();
  const isDark = currentTheme.id === 'dark';

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        'dark:bg-[#1a2332] dark:border-white/10',
        'light:bg-white light:border-gray-200'
      )}
      style={{ 
        backgroundColor: 'var(--color-surface)',
        borderColor: 'rgba(255,255,255,0.1)'
      }}
    >
      {/* Logo Section - Contains logo when expanded, toggle button when collapsed */}
      <div className="p-4 border-b relative dark:border-white/10 light:border-gray-200" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
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
                      ? 'border'
                      : 'text-text-secondary hover:bg-white/5 hover:text-text border border-transparent'
                  )}
                  style={{
                    backgroundColor: isActive 
                      ? (isDark 
                          ? 'rgba(0, 82, 255, 0.3)' 
                          : 'rgba(37, 99, 235, 0.15)')
                      : 'transparent',
                    color: isActive 
                      ? (isDark
                          ? '#ffffff'
                          : 'var(--color-accent)')
                      : 'var(--color-text-secondary)',
                    borderColor: isActive 
                      ? (isDark
                          ? 'rgba(0, 82, 255, 0.5)'
                          : 'rgba(37, 99, 235, 0.3)')
                      : 'transparent',
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ 
                    color: isActive 
                      ? (isDark
                          ? '#ffffff'
                          : 'var(--color-accent)')
                      : 'var(--color-text-secondary)' 
                  }} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium" style={{ 
                      color: isActive 
                        ? (isDark
                            ? '#ffffff'
                            : 'var(--color-accent)')
                        : 'var(--color-text-secondary)' 
                    }}>{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Watchlists Section */}
        {!isCollapsed && watchlists.length > 0 && (
          <div className="mt-6">
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
              Watchlists
            </div>
            <ul className="space-y-1">
              {watchlists.map((watchlist) => (
                <li key={watchlist.id}>
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                    <span className="truncate">{watchlist.name}</span>
                    {watchlist.isShared && (
                      <Users className="w-3 h-3 ml-auto" style={{ color: 'var(--color-text-secondary)' }} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t dark:border-white/10 light:border-gray-200" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>User</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Level 3</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}


