'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export const FeatureIcon = ({ element }: ComponentRenderProps) => {
  const {
    icon,
    size = 'md',
    variant = 'default',
    color,
    className,
    style
  } = element.props;

  const sizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20',
  };

  const iconSizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  };

  const variantStyles = {
    default: 'bg-primary/10 text-primary',
    filled: 'bg-primary text-primary-foreground',
    outlined: 'border-2 border-primary text-primary',
    gradient: 'bg-gradient-to-br from-primary to-secondary text-white',
    muted: 'bg-muted text-muted-foreground',
  };

  const IconComponent = icon
    ? (LucideIcons as any)[icon as string] || (LucideIcons as any).Star
    : (LucideIcons as any).Star;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg',
        sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md,
        !color && (variantStyles[variant as keyof typeof variantStyles] || variantStyles.default),
        className
      )}
      style={{
        ...(color && { backgroundColor: `${color}20`, color }),
        ...(style as React.CSSProperties),
      }}
    >
      <IconComponent
        className={iconSizeStyles[size as keyof typeof iconSizeStyles] || iconSizeStyles.md}
      />
    </div>
  );
};
