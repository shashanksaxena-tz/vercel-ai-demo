'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TaskCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    title,
    dueDate,
    priority,
    completed = false,
    assignee,
    avatar,
    style
  } = element.props;

  const priorityColors = {
    low: 'border-l-gray-400',
    medium: 'border-l-yellow-500',
    high: 'border-l-orange-500',
    urgent: 'border-l-red-500',
  };

  return (
    <div
      className={cn(
        'p-3 border rounded-lg bg-card border-l-4 hover:shadow-md transition-all cursor-pointer',
        priorityColors[priority as keyof typeof priorityColors] || 'border-l-transparent'
      )}
      onClick={() => onAction?.({ name: 'viewTask', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'toggleTask', payload: { id } } as never); }}
          className={cn(
            'w-4 h-4 rounded border flex-shrink-0 mt-0.5',
            completed ? 'bg-primary border-primary' : 'border-muted-foreground'
          )}
        >
          {completed && (
            <svg className="w-full h-full text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-medium', completed && 'line-through text-muted-foreground')}>
            {title as string}
          </p>
          {dueDate && (
            <p className="text-xs text-muted-foreground mt-1">{dueDate as string}</p>
          )}
        </div>
        {(assignee || avatar) && (
          avatar ? (
            <img src={avatar as string} alt={assignee as string} className="w-6 h-6 rounded-full" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
              {(assignee as string)?.charAt(0)}
            </div>
          )
        )}
      </div>
    </div>
  );
};
