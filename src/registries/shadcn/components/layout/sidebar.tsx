'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Sidebar = ({ element, children }: ComponentRenderProps) => {
  const {
    width = 256,
    minWidth,
    maxWidth,
    position = 'left',
    collapsed = false,
    collapsedWidth = 64,
    variant = 'default',
    sticky = false,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border-r',
    filled: 'bg-muted',
    floating: 'bg-background shadow-lg m-2 rounded-lg border',
    ghost: 'bg-transparent',
    inset: 'bg-muted/50 border-r',
  };

  const actualWidth = collapsed ? collapsedWidth : width;

  return (
    <aside
      className={cn(
        'h-full flex flex-col shrink-0',
        position === 'right' ? 'border-l border-r-0' : '',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        (sticky as boolean) && 'sticky top-0',
        (collapsed as boolean) && 'overflow-hidden'
      )}
      style={{
        width: actualWidth as number,
        minWidth: (minWidth ?? actualWidth) as number,
        maxWidth: maxWidth as number,
        ...(style as React.CSSProperties),
      }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </aside>
  );
};
