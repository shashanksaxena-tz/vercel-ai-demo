'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export const CTACard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    icon,
    align = 'left',
    variant = 'default',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border rounded-2xl p-8',
    filled: 'bg-muted rounded-2xl p-8',
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8',
    elevated: 'bg-background rounded-2xl p-8 shadow-xl',
    outlined: 'border-2 border-primary rounded-2xl p-8',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const IconComponent = icon
    ? (LucideIcons as any)[icon as string]
    : null;

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        alignStyles[align as keyof typeof alignStyles] || alignStyles.left,
        className
      )}
      style={style as React.CSSProperties}
    >
      {IconComponent && (
        <div
          className={cn(
            'inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary mb-6',
            align === 'center' && 'mx-auto'
          )}
        >
          <IconComponent className="h-7 w-7" />
        </div>
      )}
      {title && (
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
          {title as string}
        </h3>
      )}
      {description && (
        <p className="text-muted-foreground mb-6">{description as string}</p>
      )}
      {children && (
        <div className={cn('flex flex-wrap gap-3', align === 'center' && 'justify-center')}>
          {children}
        </div>
      )}
    </div>
  );
};
