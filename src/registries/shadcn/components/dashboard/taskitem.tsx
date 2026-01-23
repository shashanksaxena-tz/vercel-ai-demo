'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Circle, CheckCircle2, Clock, AlertCircle, User, Calendar } from 'lucide-react';

export const TaskItem = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    completed = false,
    priority = 'medium',
    dueDate,
    assignee,
    tags,
    showCheckbox = true,
    style,
  } = element.props;

  const priorityConfig = {
    low: { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Low' },
    medium: { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Medium' },
    high: { color: 'text-amber-600', bg: 'bg-amber-50', label: 'High' },
    urgent: { color: 'text-rose-600', bg: 'bg-rose-50', label: 'Urgent' },
  };

  const config = priorityConfig[(priority as keyof typeof priorityConfig) || 'medium'];
  const tagsArray = tags as string[];

  return (
    <div
      className={cn(
        'flex gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors group',
        completed && 'opacity-60'
      )}
      style={style as React.CSSProperties}
    >
      {showCheckbox && (
        <div className="pt-0.5">
          <Checkbox checked={completed as boolean} className="rounded" />
        </div>
      )}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm font-medium', completed && 'line-through text-muted-foreground')}>
            {title as React.ReactNode}
          </p>
          <span className={cn('px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap', config.bg, config.color)}>
            {config.label}
          </span>
        </div>

        {!!description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description as React.ReactNode}
          </p>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          {!!dueDate && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {dueDate as React.ReactNode}
            </span>
          )}
          {!!assignee && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              {assignee as React.ReactNode}
            </span>
          )}
          {tagsArray && tagsArray.length > 0 && (
            <div className="flex items-center gap-1">
              {tagsArray.map((tag, idx) => (
                <span key={idx} className="px-1.5 py-0.5 bg-muted rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};
