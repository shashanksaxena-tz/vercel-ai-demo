'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatGroup = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    columns = 3,
    gap = 'default',
    variant = 'cards',
    style,
  } = element.props;

  const statsItems = items as Array<{
    label: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down';
    icon?: React.ReactNode;
  }>;

  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  const gapStyles = {
    none: 'gap-0',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
  };

  if (!statsItems?.length) {
    return (
      <div
        className={cn(
          'grid',
          columnStyles[(columns as keyof typeof columnStyles) || 3],
          gapStyles[(gap as keyof typeof gapStyles) || 'default']
        )}
        style={style as React.CSSProperties}
      >
        {children}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className="flex flex-wrap items-center gap-6"
        style={style as React.CSSProperties}
      >
        {statsItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
            <div>
              <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold">{item.value}</span>
                {item.change !== undefined && (
                  <span className={cn(
                    'text-xs font-medium flex items-center gap-0.5',
                    item.change > 0 || item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {item.change > 0 || item.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(item.change)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid',
        columnStyles[(columns as keyof typeof columnStyles) || 3],
        gapStyles[(gap as keyof typeof gapStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {statsItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
            {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
          </div>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-2xl font-bold">{item.value}</p>
            {item.change !== undefined && (
              <div className={cn(
                'flex items-center gap-1 text-sm font-medium',
                item.change > 0 || item.trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}>
                {item.change > 0 || item.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(item.change)}%</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
