'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Dashboard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    layout = 'default',
    fullWidth = false,
    style,
  } = element.props;

  const layoutStyles = {
    default: 'flex flex-col min-h-screen',
    sidebar: 'flex flex-row min-h-screen',
    split: 'grid grid-cols-[280px_1fr] min-h-screen',
    compact: 'flex flex-col min-h-screen max-w-7xl mx-auto',
  };

  return (
    <div
      className={cn(
        'bg-background',
        layoutStyles[(layout as keyof typeof layoutStyles) || 'default'],
        fullWidth ? 'w-full' : ''
      )}
      style={style as React.CSSProperties}
    >
      {(!!title || !!subtitle) && (
        <div className="sr-only">
          {!!title && <h1>{title as React.ReactNode}</h1>}
          {!!subtitle && <p>{subtitle as React.ReactNode}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
