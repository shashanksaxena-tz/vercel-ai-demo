'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Section = ({ element, children }: ComponentRenderProps) => {
  const {
    id,
    padding = 'lg',
    background = 'default',
    fullWidth = false,
    maxWidth = '7xl',
    style
  } = element.props;

  const paddingStyles = {
    none: 'py-0',
    xs: 'py-4',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
    '2xl': 'py-32',
  };

  const backgroundStyles = {
    default: '',
    muted: 'bg-muted',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    gradient: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
    dark: 'bg-zinc-900 text-white',
    light: 'bg-white text-zinc-900',
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <section
      id={id as string}
      className={cn(
        'w-full',
        paddingStyles[(padding as keyof typeof paddingStyles) || 'lg'],
        backgroundStyles[(background as keyof typeof backgroundStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <div className={cn(
        (fullWidth as boolean) ? 'w-full px-4' : 'mx-auto px-4',
        !(fullWidth as boolean) && maxWidthClasses[(maxWidth as keyof typeof maxWidthClasses) || '7xl']
      )}>
        {children}
      </div>
    </section>
  );
};
