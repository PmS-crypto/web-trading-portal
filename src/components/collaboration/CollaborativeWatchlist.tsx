'use client';

import { useState, useEffect } from 'react';
import { Users, UserPlus, MessageSquare, Eye } from 'lucide-react';
import { useWatchlistStore } from '@/store/watchlistStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { WebSocketMessage } from '@/lib/websocket';
import { wsManager } from '@/lib/websocket';

interface PresenceUser {
  userId: string;
  username: string;
  avatar?: string;
  cursor?: { x: number; y: number };
  lastSeen: Date;
}

export function CollaborativeWatchlist({ watchlistId }: { watchlistId: string }) {
  const [presenceUsers, setPresenceUsers] = useState<PresenceUser[]>([]);
  const [isShared, setIsShared] = useState(false);
  const { watchlists, shareWatchlist } = useWatchlistStore();

  const watchlist = watchlists.find(w => w.id === watchlistId);

  // Subscribe to presence updates
  useWebSocket((message: WebSocketMessage) => {
    if (message.type === 'presence_update' && message.watchlistId === watchlistId) {
      if (message.action === 'join') {
        setPresenceUsers(prev => {
          const exists = prev.find(u => u.userId === message.userId);
          if (exists) return prev;
          return [...prev, {
            userId: message.userId,
            username: `User ${message.userId.slice(0, 6)}`,
            lastSeen: new Date(),
          }];
        });
      } else if (message.action === 'leave') {
        setPresenceUsers(prev => prev.filter(u => u.userId !== message.userId));
      }
    }
  }, [watchlistId]);

  useEffect(() => {
    if (watchlist?.isShared) {
      setIsShared(true);
      // Subscribe to watchlist updates
      wsManager.subscribeToWatchlist(watchlistId);
    }

    return () => {
      wsManager.unsubscribeFromWatchlist(watchlistId);
    };
  }, [watchlistId, watchlist?.isShared]);

  const handleShare = () => {
    // In real implementation, this would open a share modal
    shareWatchlist(watchlistId, []);
    setIsShared(true);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Presence Indicators */}
      {presenceUsers.length > 0 && (
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface/50 border border-gray-700">
          <Eye className="w-4 h-4 text-text-secondary" />
          <div className="flex -space-x-2">
            {presenceUsers.slice(0, 3).map((user) => (
              <div
                key={user.userId}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-surface flex items-center justify-center text-white text-xs font-semibold"
                title={user.username}
              >
                {user.username[0].toUpperCase()}
              </div>
            ))}
            {presenceUsers.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-surface border-2 border-gray-700 flex items-center justify-center text-text-secondary text-xs">
                +{presenceUsers.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs text-text-secondary ml-1">
            {presenceUsers.length} viewing
          </span>
        </div>
      )}

      {/* Share Button */}
      {!isShared && (
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-gray-700 hover:bg-surface hover:border-accent transition-colors text-sm text-text-secondary hover:text-text"
        >
          <UserPlus className="w-4 h-4" />
          Share
        </button>
      )}

      {/* Comments Button */}
      {isShared && (
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-gray-700 hover:bg-surface hover:border-accent transition-colors text-sm text-text-secondary hover:text-text"
          title="View comments"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs">Comments</span>
        </button>
      )}
    </div>
  );
}


