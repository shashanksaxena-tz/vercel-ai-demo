import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const Stats = ({ element }: ComponentRenderProps) => {
  const {
    items,
    columns = 4,
    variant = 'default',
    style
  } = element.props;

  const itemsArray = items as Array<{
    label: string;
    value: string | number;
    description?: string;
    trend?: number;
    trendDirection?: 'up' | 'down';
    icon?: string;
  }>;

  const variantStyles = {
    default: 'bg-background border',
    filled: 'bg-muted',
    outline: 'border-2',
    ghost: '',
  };

  return (
    <div
      className={cn('grid gap-4')}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...(style as React.CSSProperties),
      }}
    >
      {itemsArray?.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            'rounded-lg p-6',
            variantStyles[(variant as keyof typeof variantStyles) || 'default']
          )}
        >
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {item.label}
            </span>
            {item.icon && (
              <span className="text-muted-foreground">{item.icon}</span>
            )}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{item.value}</span>
            {item.trend !== undefined && (
              <span
                className={cn(
                  'text-sm font-medium flex items-center gap-0.5',
                  item.trendDirection === 'up'
                    ? 'text-green-600'
                    : 'text-red-600'
                )}
              >
                {item.trendDirection === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(item.trend)}%
              </span>
            )}
          </div>
          {item.description && (
            <p className="mt-1 text-xs text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
