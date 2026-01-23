import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Divider = ({ element }: ComponentRenderProps) => {
  const {
    orientation = 'horizontal',
    variant = 'default',
    label,
    style
  } = element.props;

  const isHorizontal = orientation === 'horizontal';

  const variantStyles = {
    default: 'bg-border',
    muted: 'bg-muted',
    primary: 'bg-primary',
    gradient: 'bg-gradient-to-r from-transparent via-border to-transparent',
  };

  if (label) {
    return (
      <div
        className={cn(
          'flex items-center gap-4',
          isHorizontal ? 'w-full' : 'flex-col h-full'
        )}
        style={style as React.CSSProperties}
      >
        <div
          className={cn(
            'flex-1',
            isHorizontal ? 'h-px' : 'w-px',
            variantStyles[(variant as keyof typeof variantStyles) || 'default']
          )}
        />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {label as string}
        </span>
        <div
          className={cn(
            'flex-1',
            isHorizontal ? 'h-px' : 'w-px',
            variantStyles[(variant as keyof typeof variantStyles) || 'default']
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        isHorizontal ? 'h-px w-full my-4' : 'w-px h-full mx-4',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
      role="separator"
    />
  );
};
