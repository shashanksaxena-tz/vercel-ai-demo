'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Bell, X, Check } from 'lucide-react';

export const NotificationCenter = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title = 'Notifications',
    count = 0,
    showBadge = true,
    position = 'bottom-right',
    maxHeight = 400,
    emptyMessage = 'No notifications',
    showMarkAllRead = true,
    showClearAll = true,
    className,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);

  const positionStyles = {
    'top-left': 'top-full left-0 mt-2',
    'top-right': 'top-full right-0 mt-2',
    'bottom-left': 'bottom-full left-0 mb-2',
    'bottom-right': 'bottom-full right-0 mb-2',
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onAction?.({ name: isOpen ? 'close' : 'open' });
  };

  return (
    <div
      className={cn('relative inline-block', className as string)}
      style={style as React.CSSProperties}
    >
      <button
        className="relative p-2 rounded-full hover:bg-muted transition-colors"
        onClick={handleToggle}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {showBadge && (count as number) > 0 ? (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
            {(count as number) > 99 ? '99+' : String(count)}
          </span>
        ) : null}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              'absolute z-50 w-80 bg-background border rounded-lg shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200',
              positionStyles[(position as keyof typeof positionStyles) || 'bottom-right']
            )}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">{title as string}</h3>
              <div className="flex items-center gap-1">
                {showMarkAllRead && (count as number) > 0 ? (
                  <button
                    className="p-1 rounded hover:bg-muted transition-colors"
                    onClick={() => onAction?.({ name: 'markAllRead' })}
                    title="Mark all as read"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                ) : null}
                {showClearAll && (count as number) > 0 ? (
                  <button
                    className="p-1 rounded hover:bg-muted transition-colors"
                    onClick={() => onAction?.({ name: 'clearAll' })}
                    title="Clear all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            </div>
            <div
              className="overflow-y-auto"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {children || (
                <div className="p-8 text-center text-muted-foreground">
                  {emptyMessage as string}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
