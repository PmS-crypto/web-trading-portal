// Core Types for Trackk Web Portal

export interface Stock {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  trackkScore: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  lastUpdated: Date;
}

export interface Watchlist {
  id: string;
  name: string;
  stocks: Stock[];
  isShared: boolean;
  sharedWith: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  holdings: Holding[];
  totalPnl: number;
  totalPnlPercent: number;
}

export interface Holding {
  stock: Stock;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface TrackkScore {
  value: number; // 1-10
  rating: 'bullish' | 'bearish' | 'neutral';
  breakdown: {
    technicals: number;
    sentiment: number;
    fundamentals: number;
    social: number;
  };
  sources: string[];
  lastUpdated: Date;
}

export interface DashboardWidget {
  id: string;
  type: 'chart' | 'watchlist' | 'portfolio' | 'news' | 'score' | 'orderbook' | 'custom';
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, any>;
  isPinned: boolean;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  isDefault: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  orderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED' | 'REJECTED';
  timestamp: Date;
}

export interface Position {
  stock: Stock;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  trackkScore: number;
  portfolioReturn: number;
  rank: number;
  badges: string[];
  streak: number;
}

export interface AICoPilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  actions?: AICoPilotAction[];
}

export interface AICoPilotAction {
  type: 'add_to_watchlist' | 'view_stock' | 'place_order' | 'show_chart';
  label: string;
  data: Record<string, any>;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string;
    surface: string;
    accent: string;
    text: string;
    textSecondary: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  badges: string[];
  streak: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: string;
  defaultLayout: string;
  notifications: NotificationSettings;
  keyboardShortcuts: Record<string, string>;
}

export interface NotificationSettings {
  priceAlerts: boolean;
  orderUpdates: boolean;
  recommendations: boolean;
  social: boolean;
  marketNews: boolean;
}

export interface ChartConfig {
  symbol: string;
  interval: '1m' | '5m' | '15m' | '1h' | '1d' | '1w';
  indicators: string[];
  overlays: string[];
  showTrackkScore: boolean;
}


