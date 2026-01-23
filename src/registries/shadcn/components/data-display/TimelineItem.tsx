'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Circle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const TimelineItem = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    date,
    time,
    icon,
    status,
    variant = 'default',
    style,
  } = element.props;

  const getStatusIcon = () => {
    if (icon) return icon as React.ReactNode;
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

  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'border-l-green-500';
      case 'current':
        return 'border-l-primary';
      case 'error':
        return 'border-l-red-500';
      default:
        return 'border-l-muted';
    }
  };

  return (
    <div
      className={cn(
        'relative pl-8',
        variant === 'card' && 'ml-4'
      )}
      style={style as React.CSSProperties}
    >
      <div className="absolute left-0 bg-background">{getStatusIcon()}</div>
      <div
        className={cn(
          variant === 'card' && 'p-4 border rounded-lg bg-card border-l-4',
          variant === 'card' && getStatusStyles()
        )}
      >
        {(date || time) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            {date && <span>{date as string}</span>}
            {date && time && <span>·</span>}
            {time && <span>{time as string}</span>}
          </div>
        )}
        {title && <h4 className="font-medium">{title as string}</h4>}
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description as string}</p>
        )}
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};
