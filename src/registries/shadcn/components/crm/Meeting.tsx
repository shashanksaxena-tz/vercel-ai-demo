'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Meeting = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    title,
    description,
    startTime,
    endTime,
    date,
    location,
    attendees,
    type = 'meeting',
    style
  } = element.props;

  const typeColors = {
    meeting: 'bg-blue-100 text-blue-600',
    call: 'bg-green-100 text-green-600',
    demo: 'bg-purple-100 text-purple-600',
    interview: 'bg-orange-100 text-orange-600',
  };

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewMeeting', payload: { id } })}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-10 h-10 rounded flex items-center justify-center flex-shrink-0',
          typeColors[type as keyof typeof typeColors] || typeColors.meeting
        )}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium">{title as string}</h4>
          {description && <p className="text-sm text-muted-foreground">{description as string}</p>}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
            {date && <span>{date as string}</span>}
            {startTime && endTime && <span>{startTime} - {endTime}</span>}
            {location && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {location as string}
              </span>
            )}
          </div>
          {attendees && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex -space-x-2">
                {(attendees as Array<{ name: string; avatar?: string }>).slice(0, 3).map((attendee, i) => (
                  attendee.avatar ? (
                    <img key={i} src={attendee.avatar} alt={attendee.name} className="w-6 h-6 rounded-full border-2 border-background" />
                  ) : (
                    <div key={i} className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                      {attendee.name.charAt(0)}
                    </div>
                  )
                ))}
              </div>
              {(attendees as Array<{ name: string }>).length > 3 && (
                <span className="text-xs text-muted-foreground">+{(attendees as Array<{ name: string }>).length - 3} more</span>
              )}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
