'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const MeetingCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    title,
    time,
    duration,
    attendeeCount,
    isOnline = false,
    link,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-3 border rounded-lg bg-card hover:shadow-md transition-all cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewMeeting', payload: { id } })}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={cn(
          'w-2 h-2 rounded-full',
          isOnline ? 'bg-green-500' : 'bg-blue-500'
        )} />
        <span className="text-xs text-muted-foreground">
          {isOnline ? 'Online' : 'In-person'}
        </span>
      </div>
      <h4 className="font-medium text-sm mb-1">{title as string}</h4>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {time && <span>{time as string}</span>}
        {duration && <span>({duration})</span>}
      </div>
      <div className="flex items-center justify-between mt-2">
        {attendeeCount !== undefined && (
          <span className="text-xs text-muted-foreground">{attendeeCount} attendees</span>
        )}
        {isOnline && link && (
          <button
            onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'joinMeeting', payload: { link } } as never); }}
            className="text-xs text-primary hover:underline"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
};
