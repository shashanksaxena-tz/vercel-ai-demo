'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AttachmentPreview = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    type,
    size,
    progress,
    error,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-2 bg-muted/50 border rounded-lg',
        error && 'border-destructive bg-destructive/10'
      )}
      style={style as React.CSSProperties}
    >
      <div className="w-8 h-8 flex items-center justify-center bg-muted rounded text-muted-foreground">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name as string}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {size && <span>{size as string}</span>}
          {type && <span>{type as string}</span>}
        </div>
        {progress !== undefined && progress < 100 && (
          <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {error && <p className="text-xs text-destructive mt-1">{error as string}</p>}
      </div>
      <button
        onClick={() => onAction?.({ name: 'removeAttachment', payload: { name } })}
        className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
