'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Bell, Search, Menu } from 'lucide-react';

export const DashboardHeader = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    showSearch = false,
    showNotifications = false,
    showMenu = false,
    sticky = true,
    variant = 'default',
    style,
  } = element.props;

  const variantStyles = {
    default: 'bg-background border-b',
    transparent: 'bg-transparent',
    filled: 'bg-muted',
    elevated: 'bg-background shadow-md',
  };

  return (
    <header
      className={cn(
        'flex items-center justify-between px-6 py-4 gap-4',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        sticky && 'sticky top-0 z-40'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-4">
        {showMenu && (
          <button className="p-2 rounded-md hover:bg-muted lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div>
          {!!title && (
            <h1 className="text-xl font-semibold tracking-tight">
              {title as React.ReactNode}
            </h1>
          )}
          {!!subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle as React.ReactNode}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {showSearch && (
          <button className="p-2 rounded-md hover:bg-muted">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
        {showNotifications && (
          <button className="relative p-2 rounded-md hover:bg-muted">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
        {children}
      </div>
    </header>
  );
};
