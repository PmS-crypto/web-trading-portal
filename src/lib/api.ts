// API utilities for Trackk Web Portal

// Next.js automatically makes NEXT_PUBLIC_* env vars available
// @ts-ignore - Next.js handles this at build time
const API_BASE_URL = (typeof window !== 'undefined' 
  ? (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_API_URL 
  : null) || 'https://api.trackk.in';

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('trackk_token')
    : null;
  
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

// Stock API
export const stockApi = {
  getStock: (symbol: string) => request(`/stocks/${symbol}`),
  getQuote: (symbol: string) => request(`/stocks/${symbol}/quote`),
  search: (query: string) => request(`/stocks/search?q=${encodeURIComponent(query)}`),
  getTrackkScore: (symbol: string) => request(`/stocks/${symbol}/trackk-score`),
  getNews: (symbol: string) => request(`/stocks/${symbol}/news`),
  getChart: (symbol: string, interval: string) => 
    request(`/stocks/${symbol}/chart?interval=${interval}`),
};

// Watchlist API
export const watchlistApi = {
  getAll: () => request('/watchlists'),
  get: (id: string) => request(`/watchlists/${id}`),
  create: (data: { name: string }) => request('/watchlists', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request(`/watchlists/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request(`/watchlists/${id}`, {
    method: 'DELETE',
  }),
  addStock: (id: string, symbol: string) => 
    request(`/watchlists/${id}/stocks`, {
      method: 'POST',
      body: JSON.stringify({ symbol }),
    }),
  removeStock: (id: string, symbol: string) => 
    request(`/watchlists/${id}/stocks/${symbol}`, {
      method: 'DELETE',
    }),
  share: (id: string, userIds: string[]) => 
    request(`/watchlists/${id}/share`, {
      method: 'POST',
      body: JSON.stringify({ userIds }),
    }),
};

// Portfolio API
export const portfolioApi = {
  get: () => request('/portfolio'),
  getHoldings: () => request('/portfolio/holdings'),
  getPositions: () => request('/portfolio/positions'),
  getPnl: () => request('/portfolio/pnl'),
};

// Order API
export const orderApi = {
  getAll: () => request('/orders'),
  get: (id: string) => request(`/orders/${id}`),
  place: (data: any) => request('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  cancel: (id: string) => request(`/orders/${id}/cancel`, {
    method: 'POST',
  }),
};

// User API
export const userApi = {
  getProfile: () => request('/user/profile'),
  updateProfile: (data: any) => request('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  getPreferences: () => request('/user/preferences'),
  updatePreferences: (data: any) => request('/user/preferences', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Leaderboard API
export const leaderboardApi = {
  getGlobal: (period: 'daily' | 'weekly' | 'monthly') => 
    request(`/leaderboard/global?period=${period}`),
  getFriends: () => request('/leaderboard/friends'),
  getUserRank: (userId: string) => request(`/leaderboard/users/${userId}/rank`),
};

// AI Co-Pilot API
export const aiApi = {
  chat: (message: string, context?: any) => 
    request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    }),
  getRecommendations: (filters?: any) => 
    request(`/ai/recommendations${filters ? `?${new URLSearchParams(filters)}` : ''}`),
};

