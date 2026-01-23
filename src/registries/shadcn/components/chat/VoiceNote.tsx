'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const VoiceNote = ({ element, onAction }: ComponentRenderProps) => {
  const {
    src,
    duration,
    waveform,
    style
  } = element.props;

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    onAction?.({ name: isPlaying ? 'pause' : 'play', payload: { src } } as never);
  };

  const waveformBars = (waveform as number[]) || Array(20).fill(0.5);

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 bg-muted rounded-full max-w-xs'
      )}
      style={style as React.CSSProperties}
    >
      <button
        onClick={handlePlay}
        className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full flex-shrink-0"
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="flex-1 flex items-center gap-0.5 h-6">
        {waveformBars.map((height, i) => (
          <div
            key={i}
            className="w-1 bg-muted-foreground/50 rounded-full"
            style={{ height: `${(height as number) * 100}%` }}
          />
        ))}
      </div>
      {duration && (
        <span className="text-xs text-muted-foreground">{duration as string}</span>
      )}
    </div>
  );
};
