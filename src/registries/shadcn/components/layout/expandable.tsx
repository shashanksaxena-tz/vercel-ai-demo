'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Expandable = ({ element, children }: ComponentRenderProps) => {
  const {
    defaultExpanded = false,
    collapsedHeight = 100,
    expandLabel = 'Show more',
    collapseLabel = 'Show less',
    showGradient = true,
    animationDuration = 300,
    style
  } = element.props;

  const [isExpanded, setIsExpanded] = useState(defaultExpanded as boolean);

  return (
    <div
      className={cn('relative w-full')}
      style={style as React.CSSProperties}
    >
      <div
        className={cn(
          'overflow-hidden transition-all',
          !isExpanded && (showGradient as boolean) && 'after:content-[""] after:absolute after:bottom-8 after:left-0 after:right-0 after:h-16 after:bg-gradient-to-t after:from-background after:to-transparent'
        )}
        style={{
          maxHeight: isExpanded ? '10000px' : `${collapsedHeight}px`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'mt-2 text-sm font-medium text-primary hover:underline focus:outline-none'
        )}
      >
        {isExpanded ? collapseLabel as string : expandLabel as string}
      </button>
    </div>
  );
};
