'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Circle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const Timeline = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    variant = 'default',
    orientation = 'vertical',
    alternating = false,
    style,
  } = element.props;

  const itemsArray = items as Array<{
    title: string;
    description?: string;
    date?: string;
    time?: string;
    icon?: React.ReactNode;
    status?: 'completed' | 'current' | 'upcoming' | 'error';
    content?: React.ReactNode;
  }>;

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'current':
        return <Clock className="h-4 w-4 text-primary animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getConnectorColor = (status?: string) => {
    if (status === 'completed') return 'bg-green-500';
    if (status === 'current') return 'bg-primary';
    return 'bg-muted';
  };

  if (!itemsArray?.length) {
    return (
      <div
        className={cn(
          'relative',
          orientation === 'horizontal' ? 'flex gap-8' : ''
        )}
        style={style as React.CSSProperties}
      >
        {children}
      </div>
    );
  }

  if (orientation === 'horizontal') {
    return (
      <div className="relative flex overflow-x-auto pb-4" style={style as React.CSSProperties}>
        {itemsArray.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[160px] px-4">
            <div className="flex items-center w-full">
              {idx > 0 && (
                <div className={cn('flex-1 h-0.5', getConnectorColor(itemsArray[idx - 1].status))} />
              )}
              <div className="flex-shrink-0 bg-background p-1">
                {item.icon || getStatusIcon(item.status)}
              </div>
              {idx < itemsArray.length - 1 && (
                <div className={cn('flex-1 h-0.5', getConnectorColor(item.status))} />
              )}
            </div>
            <div className="mt-3 text-center">
              {item.date && (
                <span className="text-xs text-muted-foreground block">{item.date}</span>
              )}
              {item.time && (
                <span className="text-xs text-muted-foreground block">{item.time}</span>
              )}
              <h4 className="text-sm font-medium mt-1">{item.title}</h4>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" style={style as React.CSSProperties}>
      {!alternating && <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-muted" />}
      <div className={cn('space-y-6', alternating && 'space-y-8')}>
        {itemsArray.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'relative',
              alternating
                ? idx % 2 === 0
                  ? 'pl-[calc(50%+1rem)]'
                  : 'pr-[calc(50%+1rem)] text-right'
                : 'pl-8'
            )}
          >
            <div
              className={cn(
                'absolute bg-background',
                alternating ? 'left-1/2 -translate-x-1/2' : 'left-0'
              )}
            >
              {item.icon || getStatusIcon(item.status)}
            </div>
            {alternating && idx < itemsArray.length - 1 && (
              <div
                className={cn(
                  'absolute left-1/2 top-4 w-0.5 h-full -translate-x-1/2',
                  getConnectorColor(item.status)
                )}
              />
            )}
            <div className={cn(variant === 'card' && 'p-4 border rounded-lg bg-card')}>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                {item.date && <span>{item.date}</span>}
                {item.date && item.time && <span>·</span>}
                {item.time && <span>{item.time}</span>}
              </div>
              <h4 className="font-medium">{item.title}</h4>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
              {item.content && <div className="mt-2">{item.content}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
