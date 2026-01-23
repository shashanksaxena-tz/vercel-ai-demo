'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export const Feature = ({ element, children }: ComponentRenderProps) => {
  const {
    icon,
    title,
    description,
    variant = 'default',
    align = 'left',
    iconSize = 'md',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: '',
    card: 'bg-background border rounded-xl p-6 hover:shadow-md transition-shadow',
    filled: 'bg-muted rounded-xl p-6',
    minimal: '',
    inline: 'flex-row items-start',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const iconSizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const iconInnerSize = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const IconComponent = icon
    ? (LucideIcons as any)[icon as string] || (LucideIcons as any).Star
    : null;

  const isInline = variant === 'inline';

  return (
    <div
      className={cn(
        'flex gap-4',
        isInline ? 'flex-row items-start' : 'flex-col',
        !isInline && variantStyles[variant as keyof typeof variantStyles],
        !isInline && alignStyles[align as keyof typeof alignStyles],
        className
      )}
      style={style as React.CSSProperties}
    >
      {IconComponent && (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0',
            iconSizeStyles[iconSize as keyof typeof iconSizeStyles] || iconSizeStyles.md
          )}
        >
          <IconComponent
            className={iconInnerSize[iconSize as keyof typeof iconInnerSize] || iconInnerSize.md}
          />
        </div>
      )}
      <div className={cn(!isInline && alignStyles[align as keyof typeof alignStyles])}>
        {title && <h3 className="text-xl font-semibold text-foreground">{title as string}</h3>}
        {description && (
          <p className="text-muted-foreground mt-2">{description as string}</p>
        )}
        {children}
      </div>
    </div>
  );
};
