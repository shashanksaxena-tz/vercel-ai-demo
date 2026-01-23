import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Tooltip = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    position = 'top',
    delay = 200,
    style
  } = element.props;

  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-zinc-900 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-zinc-900 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-zinc-900 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-zinc-900 border-y-transparent border-l-transparent',
  };

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay as number);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style as React.CSSProperties}
    >
      {children}
      {isVisible && content ? (
        <div
          className={cn(
            'absolute z-50 px-3 py-1.5 text-sm text-white bg-zinc-900 rounded-md shadow-md whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200',
            positionStyles[(position as keyof typeof positionStyles) || 'top']
          )}
          role="tooltip"
        >
          {content as string}
          <div
            className={cn(
              'absolute border-4',
              arrowStyles[(position as keyof typeof arrowStyles) || 'top']
            )}
          />
        </div>
      ) : null}
    </div>
  );
};
