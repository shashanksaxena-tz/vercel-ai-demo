'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Attachment = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    type,
    size,
    url,
    thumbnail,
    style
  } = element.props;

  const getIcon = () => {
    const fileType = type as string;
    if (fileType?.startsWith('image')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (fileType?.startsWith('video')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 bg-muted/50 border rounded-lg cursor-pointer hover:bg-muted transition-colors'
      )}
      onClick={() => onAction?.({ name: 'openAttachment', payload: { url, name } } as never)}
      style={style as React.CSSProperties}
    >
      {thumbnail ? (
        <img src={thumbnail as string} alt="" className="w-10 h-10 rounded object-cover" />
      ) : (
        <div className="w-10 h-10 flex items-center justify-center bg-muted rounded text-muted-foreground">
          {getIcon()}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name as string}</p>
        {size && <p className="text-xs text-muted-foreground">{size as string}</p>}
      </div>
      <button className="p-1 hover:bg-background rounded">
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  );
};
