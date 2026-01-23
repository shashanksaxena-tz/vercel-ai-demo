'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ShareMenu = ({ element, onAction }: ComponentRenderProps) => {
  const {
    url,
    title,
    platforms,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);

  const defaultPlatforms = [
    { id: 'twitter', name: 'Twitter', icon: 'X' },
    { id: 'facebook', name: 'Facebook', icon: 'f' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'in' },
    { id: 'email', name: 'Email', icon: '@' },
    { id: 'copy', name: 'Copy Link', icon: '' },
  ];

  const platformList = (platforms as Array<{ id: string; name: string; icon?: string }>) || defaultPlatforms;

  const handleShare = async (platformId: string) => {
    if (platformId === 'copy') {
      await navigator.clipboard.writeText(url as string);
    }
    onAction?.({ name: 'share', payload: { platform: platformId, url, title } } as never);
    setIsOpen(false);
  };

  return (
    <div className="relative" style={style as React.CSSProperties}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded border hover:bg-muted"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={cn(
            'absolute top-full right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-50',
            'animate-in fade-in-0 zoom-in-95'
          )}>
            {platformList.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handleShare(platform.id)}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted text-left"
              >
                <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
                  {platform.icon || platform.name.charAt(0)}
                </span>
                {platform.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
