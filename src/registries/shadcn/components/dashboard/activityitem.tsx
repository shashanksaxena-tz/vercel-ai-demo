'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Circle, CheckCircle2, AlertCircle, Info, User, MessageSquare, FileText, Settings } from 'lucide-react';

export const ActivityItem = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    timestamp,
    user,
    avatar,
    type = 'default',
    status = 'default',
    showConnector = true,
    style,
  } = element.props;

  const typeIcons = {
    default: Circle,
    user: User,
    message: MessageSquare,
    document: FileText,
    settings: Settings,
    success: CheckCircle2,
    warning: AlertCircle,
    info: Info,
  };

  const statusStyles = {
    default: 'bg-background border-border text-muted-foreground',
    success: 'bg-emerald-100 border-emerald-500 text-emerald-600',
    warning: 'bg-amber-100 border-amber-500 text-amber-600',
    error: 'bg-rose-100 border-rose-500 text-rose-600',
    info: 'bg-blue-100 border-blue-500 text-blue-600',
  };

  const Icon = typeIcons[(type as keyof typeof typeIcons) || 'default'];
  const statusStyle = statusStyles[(status as keyof typeof statusStyles) || 'default'];

  return (
    <div className="relative flex gap-3 pb-4 last:pb-0" style={style as React.CSSProperties}>
      <div className={cn('relative z-10 flex h-6 w-6 items-center justify-center rounded-full border', statusStyle)}>
        <Icon className="h-3 w-3" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            {!!user && (
              <p className="text-sm font-medium">{user as React.ReactNode}</p>
            )}
            {!!title && (
              <p className={cn('text-sm', !user && 'font-medium')}>{title as React.ReactNode}</p>
            )}
            {!!description && (
              <p className="text-sm text-muted-foreground">{description as React.ReactNode}</p>
            )}
          </div>
          {!!timestamp && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {timestamp as React.ReactNode}
            </span>
          )}
        </div>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};
