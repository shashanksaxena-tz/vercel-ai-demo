import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Skeleton = ({ element }: ComponentRenderProps) => {
  const {
    variant = 'default',
    width,
    height,
    count = 1,
    gap = 2,
    animated = true,
    rounded = 'default',
    style
  } = element.props;

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    default: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const variantStyles = {
    default: { width: '100%', height: '1rem' },
    text: { width: '100%', height: '1rem' },
    title: { width: '60%', height: '1.5rem' },
    avatar: { width: '3rem', height: '3rem', borderRadius: '9999px' },
    thumbnail: { width: '100%', height: '10rem' },
    button: { width: '6rem', height: '2.5rem' },
    card: { width: '100%', height: '12rem' },
  };

  const skeletonStyle: React.CSSProperties = {
    ...variantStyles[(variant as keyof typeof variantStyles) || 'default'],
    ...(width ? { width: typeof width === 'number' ? `${width}px` : (width as string) } : {}),
    ...(height ? { height: typeof height === 'number' ? `${height}px` : (height as string) } : {}),
    ...(style as React.CSSProperties),
  };

  const items = Array.from({ length: count as number });

  return (
    <div className={cn('flex flex-col', `gap-${gap}`)}>
      {items.map((_, index) => (
        <div
          key={index}
          className={cn(
            'bg-muted',
            animated ? 'animate-pulse' : undefined,
            variant !== 'avatar'
              ? roundedStyles[(rounded as keyof typeof roundedStyles) || 'default']
              : undefined
          )}
          style={skeletonStyle}
        />
      ))}
    </div>
  );
};
