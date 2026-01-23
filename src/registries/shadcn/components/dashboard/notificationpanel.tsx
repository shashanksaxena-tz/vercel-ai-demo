'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Settings, CheckCheck } from 'lucide-react';

export const NotificationPanel = ({ element, children }: ComponentRenderProps) => {
  const {
    title = 'Notifications',
    unreadCount,
    maxHeight = 400,
    showActions = true,
    variant = 'default',
    style,
  } = element.props;

  const variantStyles = {
    default: 'border shadow-md',
    floating: 'border-0 shadow-xl',
    embedded: 'border shadow-none',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden w-full max-w-md',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-semibold">{title as React.ReactNode}</CardTitle>
          {unreadCount !== undefined && Number(unreadCount) > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {unreadCount as React.ReactNode}
            </span>
          )}
        </div>
        {showActions && (
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Mark all as read">
              <CheckCheck className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Settings">
              <Settings className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: `${maxHeight}px` }}>
          <div className="divide-y">
            {children}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
