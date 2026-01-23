'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TopBar = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    logo,
    leftAction,
    rightActions,
    sticky = true,
    variant = 'default',
    style
  } = element.props;

  const variants = {
    default: 'bg-background border-b',
    elevated: 'bg-background shadow-sm',
    glass: 'bg-background/80 backdrop-blur-md border-b',
    transparent: 'bg-transparent',
    dark: 'bg-zinc-900 text-white border-zinc-800',
  };

  const leftActionData = leftAction as { icon?: React.ReactNode; label?: string; action?: string; href?: string };
  const rightActionsData = rightActions as Array<{
    icon: React.ReactNode;
    label?: string;
    action?: string;
    href?: string;
    badge?: string | number;
  }>;

  return (
    <header
      className={cn(
        'w-full px-4 py-3 z-40',
        sticky && 'sticky top-0',
        variants[variant as keyof typeof variants] || variants.default
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-4">
        {leftActionData && (
          <button
            onClick={() => {
              if (leftActionData.action) {
                onAction?.({ name: leftActionData.action });
              } else if (leftActionData.href) {
                window.location.href = leftActionData.href;
              }
            }}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {leftActionData.icon || (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        )}
        {logo && <img src={logo as string} alt="Logo" className="h-8 w-auto" />}
        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="text-lg font-semibold truncate">{title as string}</h1>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate">{subtitle as string}</p>
          )}
        </div>
        {rightActionsData && (
          <div className="flex items-center gap-1">
            {rightActionsData.map((action, i) => (
              <button
                key={i}
                onClick={() => {
                  if (action.action) {
                    onAction?.({ name: action.action });
                  } else if (action.href) {
                    window.location.href = action.href;
                  }
                }}
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title={action.label}
              >
                <span className="w-5 h-5">{action.icon}</span>
                {action.badge && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 flex items-center justify-center text-[10px] bg-destructive text-destructive-foreground rounded-full px-1">
                    {action.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        {children}
      </div>
    </header>
  );
};
