'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Share = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    text,
    url,
    showNativeShare = true,
    style
  } = element.props;

  const handleShare = async () => {
    if (showNativeShare && navigator.share) {
      try {
        await navigator.share({
          title: title as string,
          text: text as string,
          url: url as string,
        });
        onAction?.({ name: 'shared' });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          onAction?.({ name: 'error', payload: { error: err } } as never);
        }
      }
    } else {
      onAction?.({ name: 'fallback' });
    }
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors'
      )}
      style={style as React.CSSProperties}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      Share
    </button>
  );
};
