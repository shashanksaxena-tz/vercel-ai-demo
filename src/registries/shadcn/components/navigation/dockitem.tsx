'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DockItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    label,
    icon,
    action,
    href,
    badge,
    active,
    disabled,
    scale = 1,
    style
  } = element.props;

  const handleClick = () => {
    if (disabled) return;
    if (action) {
      onAction?.({ name: action as string, payload: { id } } as never);
    }
    if (href) {
      window.location.href = href as string;
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled as boolean}
      className={cn(
        'relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200',
        active
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-muted text-muted-foreground hover:text-foreground',
        disabled && 'opacity-50 pointer-events-none'
      )}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        ...style as React.CSSProperties
      }}
      title={label as string}
    >
      {icon ? (
        <span className="w-6 h-6">{icon as React.ReactNode}</span>
      ) : (
        children
      )}
      {badge && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-xs bg-destructive text-destructive-foreground rounded-full px-1">
          {badge as string}
        </span>
      )}
      {active && (
        <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
      )}
    </button>
  );
};
