'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ReactionPicker = ({ element, onAction }: ComponentRenderProps) => {
  const {
    emojis = ['👍', '❤️', '😂', '😮', '😢', '😡'],
    style
  } = element.props;

  return (
    <div
      className={cn(
        'flex items-center gap-1 p-2 bg-background border rounded-full shadow-lg'
      )}
      style={style as React.CSSProperties}
    >
      {(emojis as string[]).map((emoji, i) => (
        <button
          key={i}
          onClick={() => onAction?.({ name: 'selectReaction', payload: { emoji } })}
          className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full transition-transform hover:scale-125"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};
