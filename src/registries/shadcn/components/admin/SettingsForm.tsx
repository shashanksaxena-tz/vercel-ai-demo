'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SettingsForm = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    showSave = true,
    showCancel = false,
    saveText = 'Save changes',
    cancelText = 'Cancel',
    style
  } = element.props;

  return (
    <form
      className={cn('space-y-6')}
      onSubmit={(e) => {
        e.preventDefault();
        onAction?.({ name: 'save', payload: { formId: id } } as never);
      }}
      style={style as React.CSSProperties}
    >
      {children}
      {(showSave || showCancel) && (
        <div className="flex items-center gap-3 pt-4">
          {showSave && (
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {saveText as string}
            </button>
          )}
          {showCancel && (
            <button
              type="button"
              onClick={() => onAction?.({ name: 'cancel' })}
              className="px-4 py-2 border rounded-md hover:bg-muted"
            >
              {cancelText as string}
            </button>
          )}
        </div>
      )}
    </form>
  );
};
