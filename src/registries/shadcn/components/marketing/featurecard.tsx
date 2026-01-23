'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export const FeatureCard = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    icon,
    title,
    description,
    link,
    linkText = 'Learn more',
    variant = 'default',
    iconColor,
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border rounded-xl p-6 hover:shadow-lg transition-shadow',
    filled: 'bg-muted rounded-xl p-6',
    outlined: 'border-2 rounded-xl p-6 hover:border-primary transition-colors',
    elevated: 'bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow',
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6',
  };

  const IconComponent = icon
    ? (LucideIcons as any)[icon as string] || (LucideIcons as any).Star
    : null;

  const handleClick = () => {
    if (link) {
      onAction?.({ name: 'navigate', payload: { href: link } } as never);
    }
  };

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        link && 'cursor-pointer',
        className
      )}
      style={style as React.CSSProperties}
      onClick={link ? handleClick : undefined}
    >
      {IconComponent && (
        <div
          className={cn(
            'inline-flex items-center justify-center h-12 w-12 rounded-lg mb-4',
            iconColor ? '' : 'bg-primary/10 text-primary'
          )}
          style={iconColor ? { backgroundColor: `${iconColor}20`, color: iconColor } : undefined}
        >
          <IconComponent className="h-6 w-6" />
        </div>
      )}
      {title && (
        <h3 className="text-xl font-semibold text-foreground">{title as string}</h3>
      )}
      {description && (
        <p className="text-muted-foreground mt-2">{description as string}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
      {link && linkText && (
        <span className="inline-flex items-center text-sm font-medium text-primary mt-4 group">
          {linkText as string}
          <LucideIcons.ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      )}
    </div>
  );
};
