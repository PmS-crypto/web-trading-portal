'use client';

interface GridLayoutProps {
  children: React.ReactNode;
}

export function GridLayout({ children }: GridLayoutProps) {
  return (
    <div className="w-full h-full overflow-y-auto overscroll-contain">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 auto-rows-max">
          {children}
        </div>
      </div>
    </div>
  );
}
