'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Confirmation = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'default',
    isOpen = true,
    style
  } = element.props;

  if (!isOpen) return null;

  const variants = {
    default: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    destructive: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={cn('bg-background border rounded-lg p-6 max-w-md w-full mx-4 shadow-xl')}
        style={style as React.CSSProperties}
      >
        {title && <h3 className="text-lg font-semibold mb-2">{title as string}</h3>}
        {message && <p className="text-muted-foreground mb-6">{message as string}</p>}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => onAction?.({ name: 'cancel' })}
            className="px-4 py-2 border rounded hover:bg-muted"
          >
            {cancelText as string}
          </button>
          <button
            onClick={() => onAction?.({ name: 'confirm' })}
            className={cn('px-4 py-2 rounded', variants[variant as keyof typeof variants] || variants.default)}
          >
            {confirmText as string}
          </button>
        </div>
      </div>
    </div>
  );
};
