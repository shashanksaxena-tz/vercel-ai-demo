'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const EmojiSelector = ({ element, onAction }: ComponentRenderProps) => {
  const {
    categories = [
      { name: 'Smileys', emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂'] },
      { name: 'Gestures', emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '👋'] },
      { name: 'Hearts', emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍'] },
    ],
    style
  } = element.props;

  const [activeCategory, setActiveCategory] = useState(0);
  const categoryList = categories as Array<{ name: string; emojis: string[] }>;

  return (
    <div
      className={cn(
        'bg-background border rounded-lg shadow-lg overflow-hidden w-64'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex border-b">
        {categoryList.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(i)}
            className={cn(
              'flex-1 px-3 py-2 text-xs font-medium transition-colors',
              activeCategory === i
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-8 gap-1 p-2 max-h-40 overflow-y-auto">
        {categoryList[activeCategory]?.emojis.map((emoji, i) => (
          <button
            key={i}
            onClick={() => onAction?.({ name: 'selectEmoji', payload: { emoji } } as never)}
            className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded transition-transform hover:scale-125"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
