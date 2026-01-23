'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DocumentList = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title = 'Documents',
    showUpload = true,
    layout = 'list',
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title as string}</h3>
        {showUpload && (
          <button
            onClick={() => onAction?.({ name: 'uploadDocument' })}
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-muted"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
          </button>
        )}
      </div>
      <div className={cn(
        layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'
      )}>
        {children}
      </div>
    </div>
  );
};
