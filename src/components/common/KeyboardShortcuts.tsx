'use client';

import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDashboardStore } from '@/store/dashboardStore';
import { useWatchlistStore } from '@/store/watchlistStore';

export function KeyboardShortcuts() {
  const { addWidget } = useDashboardStore();
  const { createWatchlist } = useWatchlistStore();

  // Global search
  useHotkeys('ctrl+k, cmd+k', (e) => {
    e.preventDefault();
    // Focus search bar
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    searchInput?.focus();
  });

  // New watchlist
  useHotkeys('ctrl+n, cmd+n', (e) => {
    e.preventDefault();
    createWatchlist('New Watchlist');
  });

  // Add chart widget
  useHotkeys('ctrl+shift+c, cmd+shift+c', (e) => {
    e.preventDefault();
    addWidget({
      id: `widget-${Date.now()}`,
      type: 'chart',
      position: { x: 0, y: 0, w: 6, h: 4 },
      config: {},
      isPinned: false,
    });
  });

  // Add watchlist widget
  useHotkeys('ctrl+shift+w, cmd+shift+w', (e) => {
    e.preventDefault();
    addWidget({
      id: `widget-${Date.now()}`,
      type: 'watchlist',
      position: { x: 0, y: 0, w: 4, h: 6 },
      config: {},
      isPinned: false,
    });
  });

  // Save layout
  useHotkeys('ctrl+s, cmd+s', (e) => {
    e.preventDefault();
    // Trigger save layout
    console.log('Save layout');
  });

  return null;
}


