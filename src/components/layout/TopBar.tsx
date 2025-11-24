'use client';

import { useState } from 'react';
import { Search, Bell, Settings, User, Zap } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentTheme, themes, setTheme } = useThemeStore();

  return (
    <header
      className="h-16 border-b flex items-center justify-between px-6 dark:bg-[#1a2332] light:bg-white"
      style={{ 
        backgroundColor: 'var(--color-surface)', 
        borderColor: 'rgba(255,255,255,0.1)' 
      }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
          <input
            type="text"
            placeholder="Search stocks, screeners, or ask AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.1)',
              color: 'var(--color-text)',
            }}
          />
          {searchQuery && (
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs font-mono border rounded" style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'rgba(255,255,255,0.1)',
              color: 'var(--color-text-secondary)',
            }}>
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
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            title="Toggle theme"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {currentTheme.id === 'dark' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth={1.5} fill="none" opacity="0.8" />
              </svg>
            )}
          </button>
          <div className="absolute right-0 top-full mt-2 w-40 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50" style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div className="p-2">
              {themes.map((theme) => {
                const isSelected = currentTheme.id === theme.id;
                const isDark = theme.id === 'dark';
                
                return (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    className="w-full text-left px-3 py-2 rounded text-sm transition-all flex items-center gap-2"
                    style={{
                      backgroundColor: isSelected 
                        ? (isDark ? 'rgba(0, 82, 255, 0.3)' : 'rgba(37, 99, 235, 0.15)')
                        : 'transparent',
                      color: isSelected 
                        ? (isDark ? '#ffffff' : 'var(--color-accent)')
                        : 'var(--color-text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = 'var(--color-text)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }
                    }}
                  >
                    {isDark ? (
                      <svg 
                        className="w-4 h-4" 
                        viewBox="0 0 24 24" 
                        fill={isSelected ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={isSelected ? 0 : 2}
                      >
                        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg 
                        className="w-4 h-4" 
                        viewBox="0 0 24 24" 
                        fill={isSelected ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={isSelected ? 0 : 2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {isSelected ? (
                          <>
                            <circle cx="12" cy="12" r="5" fill="currentColor" />
                            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth={1.5} fill="none" opacity="0.8" />
                          </>
                        ) : (
                          <>
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                          </>
                        )}
                      </svg>
                    )}
                    {theme.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
        </button>

        {/* Settings */}
        <button
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
        </button>

        {/* User Profile */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
          <div className="text-sm">
            <div className="font-medium" style={{ color: 'var(--color-text)' }}>User</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Level 3</div>
          </div>
        </button>
      </div>
    </header>
  );
}


