'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';

export const WidgetHeader = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    showActions = false,
    bordered = false,
    style,
  } = element.props;

  return (
    <div
      className={cn(
        'flex items-start justify-between px-6 pt-6 pb-2',
        bordered && 'border-b pb-4'
      )}
      style={style as React.CSSProperties}
    >
      <div className="space-y-1">
        {!!title && (
          <h3 className="text-base font-semibold tracking-tight">
            {title as React.ReactNode}
          </h3>
        )}
        {!!subtitle && (
          <p className="text-sm text-muted-foreground">
            {subtitle as React.ReactNode}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {showActions && (
          <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};
