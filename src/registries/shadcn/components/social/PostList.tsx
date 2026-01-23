'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PostList = ({ element, children }: ComponentRenderProps) => {
  const {
    layout = 'feed',
    gap = 'default',
    style
  } = element.props;

  const layouts = {
    feed: 'flex flex-col',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    masonry: 'columns-1 sm:columns-2 lg:columns-3',
  };

  const gaps = {
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn(
        layouts[layout as keyof typeof layouts] || layouts.feed,
        gaps[gap as keyof typeof gaps] || gaps.default
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
