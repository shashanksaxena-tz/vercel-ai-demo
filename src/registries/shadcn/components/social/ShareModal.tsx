'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ShareModal = ({ element, onAction }: ComponentRenderProps) => {
  const {
    isOpen = true,
    title = 'Share',
    url,
    platforms,
    style
  } = element.props;

  const platformList = platforms as Array<{ id: string; name: string; icon?: string }>;
  const defaultPlatforms = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'email', name: 'Email' },
    { id: 'copy', name: 'Copy Link' },
  ];

  const activePlatforms = platformList || defaultPlatforms;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={cn('bg-background border rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl')}
        style={style as React.CSSProperties}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title as string}</h3>
          <button
            onClick={() => onAction?.({ name: 'close' })}
            className="p-1 hover:bg-muted rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-4">
          {activePlatforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => onAction?.({ name: 'share', payload: { platform: platform.id, url } })}
              className="flex flex-col items-center gap-1 p-2 hover:bg-muted rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                {platform.icon || platform.name.charAt(0)}
              </div>
              <span className="text-xs">{platform.name}</span>
            </button>
          ))}
        </div>

        {url && (
          <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
            <input
              type="text"
              value={url as string}
              readOnly
              className="flex-1 bg-transparent text-sm focus:outline-none truncate"
            />
            <button
              onClick={() => onAction?.({ name: 'copy', payload: { url } })}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
