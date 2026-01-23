'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FileMessage = ({ element, onAction }: ComponentRenderProps) => {
  const {
    fileName,
    fileSize,
    fileType,
    downloadUrl,
    style
  } = element.props;

  const getFileIcon = () => {
    const type = (fileType as string)?.toLowerCase();
    if (type?.includes('pdf')) return '📄';
    if (type?.includes('doc') || type?.includes('word')) return '📝';
    if (type?.includes('xls') || type?.includes('excel') || type?.includes('sheet')) return '📊';
    if (type?.includes('ppt') || type?.includes('presentation')) return '📑';
    if (type?.includes('zip') || type?.includes('rar') || type?.includes('archive')) return '📦';
    return '📎';
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 bg-muted rounded-lg max-w-xs'
      )}
      style={style as React.CSSProperties}
    >
      <span className="text-2xl">{getFileIcon()}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{fileName as string}</p>
        <p className="text-xs text-muted-foreground">{fileSize as string}</p>
      </div>
      <button
        onClick={() => onAction?.({ name: 'downloadFile', payload: { url: downloadUrl, name: fileName } })}
        className="p-2 hover:bg-background rounded-full transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  );
};
