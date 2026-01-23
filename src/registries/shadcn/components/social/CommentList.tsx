'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CommentList = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    totalComments,
    showLoadMore = false,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      {totalComments !== undefined && (
        <h4 className="font-semibold">{totalComments} Comments</h4>
      )}
      {children}
      {showLoadMore && (
        <button
          onClick={() => onAction?.({ name: 'loadMore' })}
          className="text-sm text-primary hover:underline"
        >
          Load more comments
        </button>
      )}
    </div>
  );
};
