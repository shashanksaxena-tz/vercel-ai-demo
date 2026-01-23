'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const Tag = ({ element, children, onAction }: ComponentRenderProps) => {
  const { label, variant = 'default', removable = false, removeAction, action, className, style } = element.props;

  const variants = {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary text-primary-foreground',
    outline: 'border border-input bg-background',
    muted: 'bg-muted text-muted-foreground',
  };

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (removeAction && onAction) {
      onAction({ name: removeAction as string });
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium',
        variants[(variant as keyof typeof variants)] || variants.default,
        action && 'cursor-pointer hover:opacity-80',
        className as string
      )}
      style={style as React.CSSProperties}
      onClick={handleClick}
    >
      {(label as string) || children}
      {removable && (
        <button
          type="button"
          className="ml-1 rounded-full hover:bg-foreground/10 p-0.5"
          onClick={handleRemove}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};
