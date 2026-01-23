'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Download = ({ element, onAction }: ComponentRenderProps) => {
  const {
    url,
    filename,
    mimeType,
    data,
    style
  } = element.props;

  const handleDownload = () => {
    onAction?.({ name: 'beforeDownload' });

    if (data) {
      // Download from data
      const blob = new Blob([data as string], { type: mimeType as string || 'text/plain' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename as string || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } else if (url) {
      // Download from URL
      const a = document.createElement('a');
      a.href = url as string;
      a.download = filename as string || '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    onAction?.({ name: 'afterDownload' });
  };

  return (
    <button
      onClick={handleDownload}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded border hover:bg-muted'
      )}
      style={style as React.CSSProperties}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download {filename && <span className="text-muted-foreground">({filename as string})</span>}
    </button>
  );
};
