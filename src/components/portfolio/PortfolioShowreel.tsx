'use client';

import { useState } from 'react';
import { Download, Play, Share2, Sparkles } from 'lucide-react';
import { Portfolio } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface PortfolioShowreelProps {
  portfolio: Portfolio;
}

export function PortfolioShowreel({ portfolio }: PortfolioShowreelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsPlaying(true);
    }, 2000);
  };

  const handleDownload = () => {
    // In real implementation, this would download the generated video
    console.log('Downloading showreel...');
  };

  const handleShare = () => {
    // In real implementation, this would share to social media
    if (navigator.share) {
      navigator.share({
        title: 'My Trackk Portfolio Showreel',
        text: `Check out my portfolio performance! ${formatPercent(portfolio.totalPnlPercent)} returns!`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-gray-800 p-6" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" style={{ color: 'var(--color-accent)' }} />
        <h3 className="text-lg font-semibold text-text">Portfolio Showreel</h3>
      </div>

      <p className="text-sm text-text-secondary mb-6">
        Create a beautiful animated video of your portfolio performance. Perfect for sharing on Instagram, Twitter, or with friends!
      </p>

      {/* Preview Area */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border border-gray-700 mb-6 overflow-hidden">
        {isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-text mb-2">
                {formatCurrency(portfolio.totalValue, 'INR')}
              </div>
              <div className={`text-2xl font-semibold ${
                portfolio.totalPnlPercent >= 0 ? 'text-success' : 'text-danger'
              }`}>
                {formatPercent(portfolio.totalPnlPercent)}
              </div>
              <div className="text-sm text-text-secondary mt-4">
                Portfolio Performance
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-accent" style={{ color: 'var(--color-accent)' }} />
              </div>
              <div className="text-sm text-text-secondary">
                {isGenerating ? 'Generating your showreel...' : 'Preview will appear here'}
              </div>
            </div>
          </div>
        )}

        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-surface/50 border border-gray-700">
          <div className="text-lg font-bold text-text mb-1">
            {portfolio.holdings.length}
          </div>
          <div className="text-xs text-text-secondary">Holdings</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-surface/50 border border-gray-700">
          <div className={`text-lg font-bold mb-1 ${
            portfolio.totalPnl >= 0 ? 'text-success' : 'text-danger'
          }`}>
            {formatCurrency(portfolio.totalPnl, 'INR')}
          </div>
          <div className="text-xs text-text-secondary">Total P&L</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-surface/50 border border-gray-700">
          <div className={`text-lg font-bold mb-1 ${
            portfolio.totalPnlPercent >= 0 ? 'text-success' : 'text-danger'
          }`}>
            {formatPercent(portfolio.totalPnlPercent)}
          </div>
          <div className="text-xs text-text-secondary">Return %</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || isPlaying}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : isPlaying ? (
            <>
              <Play className="w-5 h-5" />
              Playing
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Showreel
            </>
          )}
        </button>

        {isPlaying && (
          <>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-surface/50 border border-gray-700 text-text hover:bg-surface transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-surface/50 border border-gray-700 text-text hover:bg-surface transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-xs text-text-secondary">
          💡 <strong>Tip:</strong> Share your showreel on social media to show off your trading skills! 
          The video includes your portfolio value, returns, and best performing stocks.
        </p>
      </div>
    </div>
  );
}


