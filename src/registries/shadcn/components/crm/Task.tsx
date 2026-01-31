'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Task = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    title,
    description,
    status = 'pending',
    priority = 'medium',
    dueDate,
    assignee,
    relatedTo,
    style
  } = element.props;

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-yellow-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
  };

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onAction?.({ name: 'toggleTask', payload: { id } } as never)}
          className={cn(
            'w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5',
            status === 'completed' ? 'bg-primary border-primary' : 'border-muted-foreground'
          )}
        >
          {status === 'completed' && (
            <svg className="w-full h-full text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={cn('font-medium', status === 'completed' && 'line-through text-muted-foreground')}>
              {title as string}
            </h4>
            <span className={cn('text-sm', priorityColors[priority as keyof typeof priorityColors])}>
              {priority === 'urgent' && '!!!'}
              {priority === 'high' && '!!'}
              {priority === 'medium' && '!'}
            </span>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description as string}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {dueDate && <span>Due: {dueDate as string}</span>}
            {assignee && <span>Assignee: {assignee as string}</span>}
            {relatedTo && <span>• {relatedTo as string}</span>}
          </div>
        </div>
        <span className={cn('px-2 py-0.5 rounded text-xs', statusColors[status as keyof typeof statusColors])}>
          {status as string}
        </span>
      </div>
      {children}
    </div>
  );
};
