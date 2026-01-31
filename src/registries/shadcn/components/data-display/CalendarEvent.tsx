'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Clock, MapPin, User } from 'lucide-react';

export const CalendarEvent = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    startTime,
    endTime,
    date,
    location,
    attendees,
    color = '#3b82f6',
    variant = 'default',
    allDay = false,
    style,
  } = element.props;

  const attendeesArray = attendees as Array<{ name: string; avatar?: string }>;

  const variantStyles = {
    default: 'rounded-md p-2',
    compact: 'rounded px-2 py-1 text-xs',
    card: 'rounded-lg p-4 shadow-sm border',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={{
        backgroundColor: variant === 'card' ? 'white' : `${color}20`,
        borderLeft: `3px solid ${color}`,
        ...style as React.CSSProperties,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4
            className={cn('font-medium truncate', variant === 'compact' ? 'text-xs' : 'text-sm')}
            style={{ color: variant === 'card' ? undefined : color }}
          >
            {title as string}
          </h4>
          {description && variant !== 'compact' && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {description as string}
            </p>
          )}
        </div>
        {allDay && (
          <span className="flex-shrink-0 text-[10px] bg-muted px-1.5 py-0.5 rounded">
            All day
          </span>
        )}
      </div>

      {variant !== 'compact' && (
        <div className="mt-2 space-y-1">
          {(startTime || endTime) && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                {startTime as string}
                {endTime && ` - ${endTime}`}
              </span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{location as string}</span>
            </div>
          )}
          {attendeesArray?.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <div className="flex -space-x-1">
                {attendeesArray.slice(0, 3).map((attendee, idx) => (
                  attendee.avatar ? (
                    <img
                      key={idx}
                      src={attendee.avatar}
                      alt={attendee.name}
                      className="w-5 h-5 rounded-full border-2 border-background"
                    />
                  ) : (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px]"
                    >
                      {attendee.name.charAt(0)}
                    </div>
                  )
                ))}
                {attendeesArray.length > 3 && (
                  <div className="w-5 h-5 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px]">
                    +{attendeesArray.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
