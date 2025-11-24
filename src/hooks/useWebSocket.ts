// React hook for WebSocket connections

import { useEffect, useRef } from 'react';
import { wsManager, WebSocketMessage } from '@/lib/websocket';

export function useWebSocket(
  onMessage?: (message: WebSocketMessage) => void,
  dependencies: string[] = []
) {
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    const unsubscribe = wsManager.onMessage((message) => {
      onMessageRef.current?.(message);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Subscribe to symbols when dependencies change
    dependencies.forEach(symbol => {
      if (symbol) {
        wsManager.subscribe(symbol);
      }
    });

    return () => {
      dependencies.forEach(symbol => {
        if (symbol) {
          wsManager.unsubscribe(symbol);
        }
      });
    };
  }, [dependencies.join(',')]);

  return {
    isConnected: wsManager.isConnected,
    subscribe: wsManager.subscribe.bind(wsManager),
    unsubscribe: wsManager.unsubscribe.bind(wsManager),
  };
}


