'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Reaction = ({ element, onAction }: ComponentRenderProps) => {
  const {
    emoji,
    count = 0,
    reacted = false,
    users,
    style
  } = element.props;

  return (
    <button
      onClick={() => onAction?.({ name: 'toggleReaction', payload: { emoji } } as never)}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-colors',
        reacted
          ? 'bg-primary/10 border-primary text-primary'
          : 'bg-muted border-transparent hover:bg-muted/80'
      )}
      title={(users as string[])?.join(', ')}
      style={style as React.CSSProperties}
    >
      <span>{emoji as string}</span>
      {(count as number) > 0 && <span>{count as number}</span>}
    </button>
  );
};
