'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DeleteConfirm = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    message,
    confirmText,
    itemName,
    isOpen = true,
    style
  } = element.props;

  const [inputValue, setInputValue] = useState('');
  const confirmString = confirmText || itemName || 'DELETE';
  const isConfirmed = inputValue === confirmString;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={cn('bg-background border border-destructive/50 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl')}
        style={style as React.CSSProperties}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-destructive">{title as string || 'Confirm Deletion'}</h3>
        </div>

        <p className="text-muted-foreground mb-4">{message as string || 'This action cannot be undone.'}</p>

        <div className="mb-6">
          <p className="text-sm mb-2">
            Type <strong className="text-destructive">{confirmString as string}</strong> to confirm:
          </p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-destructive"
            placeholder={confirmString as string}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => onAction?.({ name: 'cancel' })}
            className="px-4 py-2 border rounded hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={() => onAction?.({ name: 'delete' })}
            disabled={!isConfirmed}
            className={cn(
              'px-4 py-2 bg-destructive text-destructive-foreground rounded',
              isConfirmed ? 'hover:bg-destructive/90' : 'opacity-50 cursor-not-allowed'
            )}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
