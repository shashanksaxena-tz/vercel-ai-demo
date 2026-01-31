'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PostFooter = ({ element, children }: ComponentRenderProps) => {
  const {
    likes,
    comments,
    shares,
    views,
    style
  } = element.props;

  return (
    <div
      className={cn('pt-3 border-t')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
        {likes !== undefined && <span>{likes} likes</span>}
        {comments !== undefined && <span>{comments} comments</span>}
        {shares !== undefined && <span>{shares} shares</span>}
        {views !== undefined && <span>{views} views</span>}
      </div>
      {children}
    </div>
  );
};
