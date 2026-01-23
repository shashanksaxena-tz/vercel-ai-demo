'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CalendarDay = ({ element, children }: ComponentRenderProps) => {
  const {
    date,
    events,
    isToday = false,
    isSelected = false,
    isOutsideMonth = false,
    disabled = false,
    style,
  } = element.props;

  const dateValue = date ? new Date(date as string) : new Date();
  const eventsArray = events as Array<{
    title: string;
    time?: string;
    color?: string;
  }>;

  return (
    <div
      className={cn(
        'min-h-[100px] p-2 border-r border-b',
        isOutsideMonth && 'bg-muted/30',
        isSelected && 'bg-primary/10',
        disabled && 'opacity-50 pointer-events-none'
      )}
      style={style as React.CSSProperties}
    >
      <div
        className={cn(
          'w-8 h-8 flex items-center justify-center text-sm mb-1',
          isToday && 'bg-primary text-primary-foreground rounded-full',
          isOutsideMonth && 'text-muted-foreground'
        )}
      >
        {dateValue.getDate()}
      </div>
      <div className="space-y-1">
        {eventsArray?.map((event, idx) => (
          <div
            key={idx}
            className="text-xs p-1 rounded truncate"
            style={{
              backgroundColor: event.color || '#3b82f6',
              color: 'white',
            }}
          >
            {event.time && <span className="font-medium">{event.time} </span>}
            {event.title}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
};
