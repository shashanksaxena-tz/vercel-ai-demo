'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Call = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    contact,
    phone,
    direction = 'outgoing',
    duration,
    outcome,
    notes,
    timestamp,
    style
  } = element.props;

  const outcomeColors = {
    connected: 'bg-green-100 text-green-800',
    'no-answer': 'bg-yellow-100 text-yellow-800',
    busy: 'bg-orange-100 text-orange-800',
    voicemail: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewCall', payload: { id } })}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center',
          direction === 'incoming' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
        )}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{contact as string}</h4>
            {outcome && (
              <span className={cn('px-2 py-0.5 rounded text-xs', outcomeColors[outcome as keyof typeof outcomeColors])}>
                {outcome as string}
              </span>
            )}
          </div>
          {phone && <p className="text-sm text-muted-foreground">{phone as string}</p>}
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="capitalize">{direction as string}</span>
            {duration && <span>{duration as string}</span>}
            {timestamp && <span>{timestamp as string}</span>}
          </div>
          {notes && <p className="text-sm text-muted-foreground mt-2">{notes as string}</p>}
        </div>
      </div>
      {children}
    </div>
  );
};
