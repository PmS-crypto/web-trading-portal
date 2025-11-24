'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { AICoPilotMessage } from '@/types';

export function AICoPilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AICoPilotMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your AI trading co-pilot. Ask me anything about stocks, market analysis, or trading strategies.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useThemeStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: AICoPilotMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: AICoPilotMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `I understand you're asking about "${input}". Based on current market data, here's my analysis...`,
        timestamp: new Date(),
        sources: ['Market data', 'Technical analysis'],
        actions: [
          {
            type: 'add_to_watchlist',
            label: 'Add to Watchlist',
            data: { symbol: 'RELIANCE' },
          },
        ],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:bg-accent/90 transition-all hover:scale-110 flex items-center justify-center z-40"
        style={{ backgroundColor: 'var(--color-accent)' }}
        title="AI Co-Pilot"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 w-96 h-[600px] bg-surface border border-gray-700 rounded-xl shadow-2xl z-50 flex flex-col"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-text">AI Co-Pilot</div>
            <div className="text-xs text-text-secondary">Always here to help</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 rounded hover:bg-surface/50 transition-colors"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-accent text-white'
                  : 'bg-surface/50 text-text border border-gray-700'
              }`}
              style={
                message.role === 'user'
                  ? { backgroundColor: 'var(--color-accent)' }
                  : { backgroundColor: 'rgba(255,255,255,0.05)' }
              }
            >
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              {message.sources && message.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <div className="text-xs text-text-secondary mb-1">Sources:</div>
                  <div className="flex flex-wrap gap-1">
                    {message.sources.map((source, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-surface rounded"
                        style={{ backgroundColor: 'var(--color-surface)' }}
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.actions.map((action, idx) => (
                    <button
                      key={idx}
                      className="text-xs px-3 py-1 bg-accent/20 text-accent rounded hover:bg-accent/30 transition-colors"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface/50 rounded-lg p-3 border border-gray-700">
              <Loader2 className="w-5 h-5 text-accent animate-spin" style={{ color: 'var(--color-accent)' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800/50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 rounded-lg bg-surface/50 border border-gray-700 text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-text-secondary">
          Try: "Why did GMBREW gap down?" or "Give me 5 stocks Rakesh Jhunjhunwala would love"
        </div>
      </div>
    </div>
  );
}


