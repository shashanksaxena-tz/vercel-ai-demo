'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PostBody = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    expandable = false,
    maxLines = 3,
    style
  } = element.props;

  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={cn('py-3')}
      style={style as React.CSSProperties}
    >
      {content && (
        <p className={cn(
          'whitespace-pre-wrap',
          expandable && !expanded && `line-clamp-${maxLines}`
        )}>
          {content as string}
        </p>
      )}
      {expandable && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-muted-foreground hover:text-foreground mt-1"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
      {children}
    </div>
  );
};
