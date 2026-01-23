'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Time = ({ element, children }: ComponentRenderProps) => {
  const { datetime, format = 'default', relative = false, className, style } = element.props;

  const formatDate = (dateStr: string, formatType: string): string => {
    try {
      const date = new Date(dateStr);

      if (relative) {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return 'just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        if (days < 30) return `${Math.floor(days / 7)}w ago`;
        if (days < 365) return `${Math.floor(days / 30)}mo ago`;
        return `${Math.floor(days / 365)}y ago`;
      }

      const formats: Record<string, Intl.DateTimeFormatOptions> = {
        default: { dateStyle: 'medium' },
        short: { month: 'short', day: 'numeric' },
        long: { dateStyle: 'long' },
        full: { dateStyle: 'full' },
        time: { timeStyle: 'short' },
        datetime: { dateStyle: 'medium', timeStyle: 'short' },
        iso: {},
      };

      if (formatType === 'iso') {
        return date.toISOString();
      }

      return new Intl.DateTimeFormat('en-US', formats[formatType] || formats.default).format(date);
    } catch {
      return dateStr;
    }
  };

  const dateValue = (datetime || children) as string;
  const displayValue = dateValue ? formatDate(dateValue, format as string) : children;

  return (
    <time
      dateTime={datetime as string}
      className={cn('text-muted-foreground', className as string)}
      style={style as React.CSSProperties}
    >
      {displayValue as React.ReactNode}
    </time>
  );
};
