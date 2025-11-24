'use client';

import { useState } from 'react';
import { Search, Bell, Settings, User, Zap } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentTheme, themes, setTheme } = useThemeStore();

  return (
    <header
      className="h-16 border-b border-gray-800/50 flex items-center justify-between px-6"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'rgba(255,255,255,0.1)' }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search stocks, screeners, or ask AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface/50 border border-gray-700 text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          />
          {searchQuery && (
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs font-mono bg-surface border border-gray-700 rounded text-text-secondary">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Theme Selector */}
        <div className="relative group">
          <button
            className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
            title="Toggle theme"
          >
            {currentTheme.id === 'dark' ? (
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <div className="absolute right-0 top-full mt-2 w-40 bg-surface border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center gap-2
                    ${currentTheme.id === theme.id
                      ? 'bg-accent/20 text-accent'
                      : 'text-text-secondary hover:bg-surface/50 hover:text-text'
                    }
                  `}
                >
                  {theme.id === 'dark' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg hover:bg-surface/50 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
        </button>

        {/* Settings */}
        <button
          className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5 text-text-secondary" />
        </button>

        {/* User Profile */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
          <div className="text-sm">
            <div className="text-text font-medium">User</div>
            <div className="text-xs text-text-secondary">Level 3</div>
          </div>
        </button>
      </div>
    </header>
  );
}


