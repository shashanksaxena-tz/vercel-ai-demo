'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, MessageSquare, UserPlus, FileText, Settings, AlertCircle, CheckCircle2 } from 'lucide-react';

export const NotificationItem = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    message,
    timestamp,
    avatar,
    avatarFallback,
    type = 'default',
    isRead = false,
    isNew = false,
    action,
    style,
  } = element.props;

  const typeConfig = {
    default: { icon: Bell, color: 'text-muted-foreground', bg: 'bg-muted' },
    message: { icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
    user: { icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    document: { icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    system: { icon: Settings, color: 'text-purple-600', bg: 'bg-purple-50' },
    alert: { icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    success: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  };

  const config = typeConfig[(type as keyof typeof typeConfig) || 'default'];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer',
        !isRead && 'bg-muted/30',
        isNew && 'border-l-2 border-primary'
      )}
      style={style as React.CSSProperties}
    >
      {avatar ? (
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={avatar as string} alt="" />
          <AvatarFallback>{(avatarFallback as string) || (title as string)?.[0]}</AvatarFallback>
        </Avatar>
      ) : (
        <div className={cn('h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0', config.bg)}>
          <Icon className={cn('h-5 w-5', config.color)} />
        </div>
      )}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm leading-tight', !isRead && 'font-medium')}>
            {title as React.ReactNode}
          </p>
          {!!timestamp && (
            <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
              {timestamp as React.ReactNode}
            </span>
          )}
        </div>
        {!!message && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {message as React.ReactNode}
          </p>
        )}
        {!!action && (
          <div className="pt-1">
            <button className="text-xs font-medium text-primary hover:underline">
              {action as React.ReactNode}
            </button>
          </div>
        )}
        {children}
      </div>
      {!isRead && (
        <div className="flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
};
