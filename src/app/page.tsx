'use client';

import { useEffect } from 'react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { AICoPilot } from '@/components/ai/AICoPilot';
import { WidgetPalette } from '@/components/dashboard/WidgetPalette';
import { LayoutPresetSwitcher } from '@/components/dashboard/LayoutPresetSwitcher';
import { useThemeStore } from '@/store/themeStore';
import { useNavigationStore } from '@/store/navigationStore';
import { KeyboardShortcuts } from '@/components/common/KeyboardShortcuts';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { BadgeSystem } from '@/components/gamification/BadgeSystem';
import { PortfolioShowreel } from '@/components/portfolio/PortfolioShowreel';

export default function Home() {
  const { currentTheme, setTheme } = useThemeStore();
  const { currentView } = useNavigationStore();

  useEffect(() => {
    // Apply theme on mount
    setTheme(currentTheme.id);
    // Apply theme class to html element
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('light', currentTheme.id === 'light');
      document.documentElement.classList.toggle('dark', currentTheme.id === 'dark');
    }
  }, [currentTheme.id, setTheme]);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'leaderboard':
        return (
          <div className="h-full p-6 overflow-y-auto">
            <Leaderboard />
          </div>
        );
      case 'portfolio':
        return (
          <div className="h-full p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <PortfolioShowreel
                portfolio={{
                  totalValue: 1250000,
                  dayChange: 12500,
                  dayChangePercent: 1.01,
                  holdings: [],
                  totalPnl: 12500,
                  totalPnlPercent: 1.01,
                }}
              />
            </div>
          </div>
        );
      case 'watchlists':
      case 'screeners':
      case 'learn':
      case 'squads':
      case 'settings':
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-text mb-2">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Coming Soon
              </h3>
              <p className="text-text-secondary">
                This feature is under development
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: currentTheme.colors.bg }}>
      <KeyboardShortcuts />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-hidden relative min-h-0">
          {renderContent()}
        </main>
      </div>
      <AICoPilot />
      {/* Widget Palette - Always visible in all sections */}
      <WidgetPalette />
      {/* Layout Preset Switcher - Only on dashboard */}
      {currentView === 'dashboard' && <LayoutPresetSwitcher />}
    </div>
  );
}


