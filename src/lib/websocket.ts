// WebSocket utilities for real-time updates

// @ts-ignore - Next.js handles this at build time
const WS_BASE_URL = (typeof window !== 'undefined' 
  ? (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_WS_URL 
  : null) || 'wss://ws.trackk.in';

export type WebSocketMessage = 
  | { type: 'price_update'; symbol: string; price: number; change: number; changePercent: number }
  | { type: 'order_update'; orderId: string; status: string }
  | { type: 'presence_update'; userId: string; watchlistId: string; action: 'join' | 'leave' }
  | { type: 'watchlist_update'; watchlistId: string; stock: any }
  | { type: 'news_alert'; symbol: string; news: any }
  | { type: 'trackk_score_update'; symbol: string; score: number };

export type WebSocketCallback = (message: WebSocketMessage) => void;

class WebSocketManager {
  private ws: WebSocket | null = null;
  private callbacks: Set<WebSocketCallback> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnecting = false;
  private subscriptions: Set<string> = new Set();

  connect(token?: string): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return Promise.resolve();
    }

    this.isConnecting = true;

    return new Promise((resolve, reject) => {
      try {
        const url = token ? `${WS_BASE_URL}?token=${token}` : WS_BASE_URL;
        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.resubscribe();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data) as WebSocketMessage;
            this.callbacks.forEach(callback => callback(message));
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isConnecting = false;
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.isConnecting = false;
          this.attemptReconnect(token);
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
  }

  subscribe(symbol: string) {
    if (this.subscriptions.has(symbol)) return;
    
    this.subscriptions.add(symbol);
    this.send({ type: 'subscribe', symbol });
  }

  unsubscribe(symbol: string) {
    if (!this.subscriptions.has(symbol)) return;
    
    this.subscriptions.delete(symbol);
    this.send({ type: 'unsubscribe', symbol });
  }

  subscribeToWatchlist(watchlistId: string) {
    this.send({ type: 'subscribe_watchlist', watchlistId });
  }

  unsubscribeFromWatchlist(watchlistId: string) {
    this.send({ type: 'unsubscribe_watchlist', watchlistId });
  }

  private resubscribe() {
    this.subscriptions.forEach(symbol => {
      this.send({ type: 'subscribe', symbol });
    });
  }

  private send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  private attemptReconnect(token?: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      this.connect(token).catch(() => {
        // Reconnection will be attempted again
      });
    }, delay);
  }

  onMessage(callback: WebSocketCallback): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const wsManager = new WebSocketManager();

