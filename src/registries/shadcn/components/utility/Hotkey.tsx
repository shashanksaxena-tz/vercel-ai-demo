'use client';
// @ts-nocheck

import React, { useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Hotkey = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    keys,
    action,
    description,
    disabled = false,
    showHint = false,
    style
  } = element.props;

  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyList = (keys as string).toLowerCase().split('+');
      const pressedKeys = [];

      if (e.ctrlKey || e.metaKey) pressedKeys.push('cmd');
      if (e.altKey) pressedKeys.push('alt');
      if (e.shiftKey) pressedKeys.push('shift');
      pressedKeys.push(e.key.toLowerCase());

      const isMatch = keyList.every(k => pressedKeys.includes(k)) && keyList.length === pressedKeys.length;

      if (isMatch) {
        e.preventDefault();
        onAction?.({ name: action as string || 'hotkey', payload: { keys } } as never);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, action, disabled, onAction]);

  if (!showHint && !children) return null;

  return (
    <span
      className={cn('inline-flex items-center gap-1')}
      style={style as React.CSSProperties}
    >
      {children}
      {showHint && (
        <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono text-muted-foreground">
          {keys as string}
        </kbd>
      )}
    </span>
  );
};
