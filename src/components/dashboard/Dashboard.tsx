'use client';

import { useEffect, useRef } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useWidgetPaletteStore } from '@/store/widgetPaletteStore';
import { GridLayout } from './GridLayout';
import { WidgetRenderer } from './WidgetRenderer';
import { WidgetPalette } from './WidgetPalette';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const { widgets, isDragging } = useDashboardStore();
  const { open: openPalette } = useWidgetPaletteStore();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden',
        isDragging && 'cursor-grabbing'
      )}
    >

      {/* Grid Layout Container */}
      <GridLayout>
        {widgets.map((widget) => (
          <div
            key={widget.id}
            data-grid={widget.position}
            className="widget-container"
          >
            <WidgetRenderer widget={widget} />
          </div>
        ))}
      </GridLayout>

      {/* Empty State */}
      {widgets.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-text mb-2">
              Build Your Trading Workspace
            </h3>
            <p className="text-text-secondary mb-6">
              Drag widgets from the palette to get started
            </p>
            <button
              onClick={openPalette}
              className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors shadow-lg hover:shadow-xl"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              Add Your First Widget
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


