'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Collapsible = ({ element, children }: ComponentRenderProps) => {
  const {
    defaultOpen = false,
    trigger,
    direction = 'vertical',
    animationDuration = 200,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(defaultOpen as boolean);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={cn('w-full')}
      style={style as React.CSSProperties}
    >
      {(trigger as string) && (
        <button
          type="button"
          onClick={toggleOpen}
          className={cn(
            'flex items-center justify-between w-full p-2 text-left',
            'hover:bg-muted rounded-md transition-colors'
          )}
        >
          <span>{trigger as string}</span>
          <svg
            className={cn(
              'w-4 h-4 transition-transform',
              isOpen && 'rotate-180'
            )}
            style={{
              transitionDuration: `${animationDuration}ms`,
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
      <div
        className={cn(
          'overflow-hidden transition-all',
          direction === 'horizontal' && 'flex'
        )}
        style={{
          transitionDuration: `${animationDuration}ms`,
          ...(direction === 'vertical'
            ? { maxHeight: isOpen ? '1000px' : '0px', opacity: isOpen ? 1 : 0 }
            : { maxWidth: isOpen ? '1000px' : '0px', opacity: isOpen ? 1 : 0 }
          ),
        }}
      >
        <div className={cn('pt-2', !isOpen && 'invisible')}>
          {children}
        </div>
      </div>
    </div>
  );
};
