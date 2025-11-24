import { create } from 'zustand';
import { Watchlist, Stock } from '@/types';

interface WatchlistState {
  watchlists: Watchlist[];
  activeWatchlistId: string | null;
  selectedStocks: string[];
  
  // Actions
  createWatchlist: (name: string) => void;
  deleteWatchlist: (id: string) => void;
  setActiveWatchlist: (id: string) => void;
  addStockToWatchlist: (watchlistId: string, stock: Stock) => void;
  removeStockFromWatchlist: (watchlistId: string, stockSymbol: string) => void;
  shareWatchlist: (watchlistId: string, userIds: string[]) => void;
  toggleStockSelection: (symbol: string) => void;
  clearSelection: () => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlists: [],
  activeWatchlistId: null,
  selectedStocks: [],

  createWatchlist: (name) => {
    const newWatchlist: Watchlist = {
      id: `watchlist-${Date.now()}`,
      name,
      stocks: [],
      isShared: false,
      sharedWith: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      watchlists: [...state.watchlists, newWatchlist],
      activeWatchlistId: newWatchlist.id,
    }));
  },

  deleteWatchlist: (id) => {
    set((state) => ({
      watchlists: state.watchlists.filter(w => w.id !== id),
      activeWatchlistId: state.activeWatchlistId === id ? null : state.activeWatchlistId,
    }));
  },

  setActiveWatchlist: (id) => {
    set({ activeWatchlistId: id });
  },

  addStockToWatchlist: (watchlistId, stock) => {
    set((state) => ({
      watchlists: state.watchlists.map(w =>
        w.id === watchlistId
          ? {
              ...w,
              stocks: [...w.stocks, stock],
              updatedAt: new Date(),
            }
          : w
      ),
    }));
  },

  removeStockFromWatchlist: (watchlistId, stockSymbol) => {
    set((state) => ({
      watchlists: state.watchlists.map(w =>
        w.id === watchlistId
          ? {
              ...w,
              stocks: w.stocks.filter(s => s.symbol !== stockSymbol),
              updatedAt: new Date(),
            }
          : w
      ),
    }));
  },

  shareWatchlist: (watchlistId, userIds) => {
    set((state) => ({
      watchlists: state.watchlists.map(w =>
        w.id === watchlistId
          ? {
              ...w,
              isShared: true,
              sharedWith: userIds,
              updatedAt: new Date(),
            }
          : w
      ),
    }));
  },

  toggleStockSelection: (symbol) => {
    set((state) => ({
      selectedStocks: state.selectedStocks.includes(symbol)
        ? state.selectedStocks.filter(s => s !== symbol)
        : [...state.selectedStocks, symbol],
    }));
  },

  clearSelection: () => {
    set({ selectedStocks: [] });
  },
}));


