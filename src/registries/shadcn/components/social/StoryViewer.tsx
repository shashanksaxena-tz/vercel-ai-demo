'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const StoryViewer = ({ element, onAction }: ComponentRenderProps) => {
  const {
    stories,
    currentIndex = 0,
    user,
    avatar,
    timestamp,
    isOpen = true,
    style
  } = element.props;

  const storyList = stories as Array<{ type: string; url: string; duration?: number }>;

  if (!isOpen) return null;

  return (
    <div
      className={cn('fixed inset-0 bg-black z-50 flex items-center justify-center')}
      style={style as React.CSSProperties}
    >
      <button
        onClick={() => onAction?.({ name: 'close' })}
        className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative max-w-lg w-full h-full max-h-[80vh]">
        <div className="absolute top-0 left-0 right-0 p-4 z-10">
          <div className="flex gap-1 mb-3">
            {storyList?.map((_, i) => (
              <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full bg-white',
                    i < (currentIndex as number) ? 'w-full' :
                    i === (currentIndex as number) ? 'w-1/2 animate-progress' : 'w-0'
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {avatar && (
              <img src={avatar as string} alt={user as string} className="w-8 h-8 rounded-full" />
            )}
            <div>
              <p className="text-white font-medium text-sm">{user as string}</p>
              {timestamp && <p className="text-white/60 text-xs">{timestamp as string}</p>}
            </div>
          </div>
        </div>

        {storyList && storyList[currentIndex as number] && (
          storyList[currentIndex as number].type === 'video' ? (
            <video
              src={storyList[currentIndex as number].url}
              className="w-full h-full object-contain"
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={storyList[currentIndex as number].url}
              alt=""
              className="w-full h-full object-contain"
            />
          )
        )}

        <button
          onClick={() => onAction?.({ name: 'prev' })}
          className="absolute left-0 top-0 bottom-0 w-1/3"
        />
        <button
          onClick={() => onAction?.({ name: 'next' })}
          className="absolute right-0 top-0 bottom-0 w-2/3"
        />
      </div>
    </div>
  );
};
