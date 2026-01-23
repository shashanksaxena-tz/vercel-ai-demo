'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const Stats = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    columns = 4,
    variant = 'default',
    dividers = true,
    style,
  } = element.props;

  const statsItems = items as Array<{
    label: string;
    value: string | number;
    description?: string;
    trend?: 'up' | 'down';
    trendValue?: string;
    icon?: React.ReactNode;
  }>;

  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5',
    6: 'grid-cols-3 md:grid-cols-6',
  };

  const variantStyles = {
    default: 'bg-card border rounded-lg',
    elevated: 'bg-card shadow-lg rounded-lg',
    transparent: 'bg-transparent',
  };

  if (!statsItems?.length) {
    return (
      <div
        className={cn(
          'grid',
          columnStyles[(columns as keyof typeof columnStyles) || 4],
          dividers && 'divide-x divide-y',
          variantStyles[(variant as keyof typeof variantStyles) || 'default']
        )}
        style={style as React.CSSProperties}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid',
        columnStyles[(columns as keyof typeof columnStyles) || 4],
        dividers && 'divide-x divide-y md:divide-y-0',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {statsItems.map((item, idx) => (
        <div key={idx} className="p-6 text-center">
          {item.icon && (
            <div className="flex justify-center mb-2">
              {item.icon}
            </div>
          )}
          <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
          <p className="text-3xl font-bold mt-1">{item.value}</p>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
          )}
          {(item.trend || item.trendValue) && (
            <div className="flex items-center justify-center gap-1 mt-2">
              {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
              {item.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
              {item.trendValue && (
                <span className={cn(
                  'text-sm font-medium',
                  item.trend === 'up' && 'text-green-600',
                  item.trend === 'down' && 'text-red-600'
                )}>
                  {item.trendValue}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
