'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DashboardSidebar = ({ element, children }: ComponentRenderProps) => {
  const {
    width = 280,
    collapsed = false,
    collapsedWidth = 64,
    position = 'left',
    variant = 'default',
    style,
  } = element.props;

  const variantStyles = {
    default: 'bg-background border-r',
    filled: 'bg-muted',
    elevated: 'bg-background shadow-lg',
    transparent: 'bg-transparent',
  };

  const positionStyles = {
    left: 'order-first',
    right: 'order-last border-r-0 border-l',
  };

  return (
    <aside
      className={cn(
        'flex flex-col h-screen overflow-hidden transition-all duration-300',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        positionStyles[(position as keyof typeof positionStyles) || 'left']
      )}
      style={{
        width: collapsed ? collapsedWidth : width,
        minWidth: collapsed ? collapsedWidth : width,
        ...(style as React.CSSProperties),
      }}
    >
      <div className={cn('flex-1 overflow-y-auto py-4', collapsed ? 'px-2' : 'px-4')}>
        {children}
      </div>
    </aside>
  );
};
