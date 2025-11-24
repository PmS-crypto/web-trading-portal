'use client';

import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardWidget } from '@/types';
import { useEffect, useState } from 'react';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  children: React.ReactNode;
}

export function GridLayout({ children }: GridLayoutProps) {
  const { widgets, updateWidgetPosition } = useDashboardStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const layout: Layout[] = widgets.map((widget) => ({
    i: widget.id,
    x: widget.position.x,
    y: widget.position.y,
    w: widget.position.w,
    h: widget.position.h,
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
  }));

  const handleLayoutChange = (newLayout: Layout[], allLayouts: any) => {
    // Use lg layout as primary
    const primaryLayout = newLayout;
    primaryLayout.forEach((item) => {
      const widget = widgets.find((w) => w.id === item.i);
      if (widget) {
        updateWidgetPosition(widget.id, {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        });
      }
    });
  };

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full p-4">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        isDraggable={true}
        isResizable={true}
        draggableHandle=".widget-drag-handle"
        style={{
          backgroundColor: 'transparent',
        }}
        margin={[16, 16]}
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  );
}

