import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Header = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    align = 'left',
    size = 'default',
    style
  } = element.props;

  const alignStyles = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const sizeStyles = {
    sm: {
      title: 'text-xl md:text-2xl',
      subtitle: 'text-xs',
      description: 'text-sm',
    },
    default: {
      title: 'text-2xl md:text-3xl',
      subtitle: 'text-sm',
      description: 'text-base',
    },
    lg: {
      title: 'text-3xl md:text-4xl',
      subtitle: 'text-sm',
      description: 'text-lg',
    },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  return (
    <header
      className={cn(
        'max-w-3xl mb-8',
        alignStyles[(align as keyof typeof alignStyles) || 'left']
      )}
      style={style as React.CSSProperties}
    >
      {subtitle ? (
        <span className={cn('font-medium text-primary uppercase tracking-wider mb-2 block', sizes.subtitle)}>
          {subtitle as string}
        </span>
      ) : null}
      {title ? (
        <h2 className={cn('font-bold tracking-tight mb-3', sizes.title)}>
          {title as string}
        </h2>
      ) : null}
      {description ? (
        <p className={cn('text-muted-foreground', sizes.description)}>
          {description as string}
        </p>
      ) : null}
      {children}
    </header>
  );
};
