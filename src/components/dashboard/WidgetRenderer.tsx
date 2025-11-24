'use client';

import { DashboardWidget } from '@/types';
import { ChartWidget } from './widgets/ChartWidget';
import { WatchlistWidget } from './widgets/WatchlistWidget';
import { PortfolioWidget } from './widgets/PortfolioWidget';
import { TrackkScoreWidget } from './widgets/TrackkScoreWidget';
import { NewsWidget } from './widgets/NewsWidget';
import { OrderBookWidget } from './widgets/OrderBookWidget';

interface WidgetRendererProps {
  widget: DashboardWidget;
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const renderWidget = () => {
    switch (widget.type) {
      case 'chart':
        return <ChartWidget config={widget.config} />;
      case 'watchlist':
        return <WatchlistWidget config={widget.config} />;
      case 'portfolio':
        return <PortfolioWidget config={widget.config} />;
      case 'score':
        return <TrackkScoreWidget config={widget.config} />;
      case 'news':
        return <NewsWidget config={widget.config} />;
      case 'orderbook':
        return <OrderBookWidget config={widget.config} />;
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div className="widget-wrapper h-full w-full">
      {renderWidget()}
    </div>
  );
}


