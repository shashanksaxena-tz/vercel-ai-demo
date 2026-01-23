'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface DockItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  action?: string;
  href?: string;
  badge?: string | number;
  active?: boolean;
}

export const Dock = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    position = 'bottom',
    variant = 'default',
    magnify = true,
    style
  } = element.props;

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const dockItems = items as DockItemProps[];

  const positions = {
    bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2',
    top: 'fixed top-4 left-1/2 -translate-x-1/2',
    left: 'fixed left-4 top-1/2 -translate-y-1/2 flex-col',
    right: 'fixed right-4 top-1/2 -translate-y-1/2 flex-col',
  };

  const variants = {
    default: 'bg-background/80 backdrop-blur-md border shadow-lg',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl',
    solid: 'bg-background border shadow-md',
    dark: 'bg-zinc-900 border-zinc-800 shadow-xl',
  };

  const getScale = (index: number) => {
    if (!magnify || hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.4;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.1;
    return 1;
  };

  const handleItemClick = (item: DockItemProps) => {
    if (item.action) {
      onAction?.({ name: item.action, payload: { id: item.id } } as never);
    }
    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div
      className={cn(
        'flex items-end gap-1 p-2 rounded-2xl z-50',
        positions[position as keyof typeof positions] || positions.bottom,
        variants[variant as keyof typeof variants] || variants.default
      )}
      style={style as React.CSSProperties}
    >
      {dockItems?.map((item, index) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={cn(
            'relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200',
            item.active
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
          )}
          style={{
            transform: `scale(${getScale(index)})`,
            transformOrigin: 'bottom center',
          }}
          title={item.label}
        >
          <span className="w-6 h-6">{item.icon}</span>
          {item.badge && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-xs bg-destructive text-destructive-foreground rounded-full px-1">
              {item.badge}
            </span>
          )}
          {item.active && (
            <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
          )}
        </button>
      ))}
      {children}
    </div>
  );
};
