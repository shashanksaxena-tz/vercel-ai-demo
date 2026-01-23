'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, Check } from 'lucide-react';

export const Chip = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    variant = 'default',
    selected = false,
    removable = false,
    removeAction,
    action,
    avatar,
    icon,
    className,
    style
  } = element.props;

  const variants = {
    default: selected
      ? 'bg-primary text-primary-foreground'
      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: selected
      ? 'border-2 border-primary bg-primary/10'
      : 'border border-input hover:bg-accent',
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
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors',
        variants[(variant as keyof typeof variants)] || variants.default,
        action && 'cursor-pointer',
        className as string
      )}
      style={style as React.CSSProperties}
      onClick={handleClick}
    >
      {avatar && (
        <img
          src={avatar as string}
          alt=""
          className="h-5 w-5 rounded-full object-cover -ml-1"
        />
      )}
      {icon && !avatar && <span className="-ml-0.5">{icon as React.ReactNode}</span>}
      {selected && !icon && !avatar && <Check className="h-4 w-4 -ml-0.5" />}
      {(label as string) || children}
      {removable && (
        <button
          type="button"
          className="ml-0.5 rounded-full hover:bg-foreground/10 p-0.5 -mr-1"
          onClick={handleRemove}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};
