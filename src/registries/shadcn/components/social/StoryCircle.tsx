'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const StoryCircle = ({ element, children }: ComponentRenderProps) => {
  const {
    style
  } = element.props;

  return (
    <div
      className={cn('flex items-center gap-3 overflow-x-auto py-4 px-2')}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
