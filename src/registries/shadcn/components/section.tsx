import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Section = ({ element, children }: ComponentRenderProps) => {
  const {
    id,
    padding = 'lg',
    background = 'default',
    fullWidth = false,
    style
  } = element.props;

  const paddingStyles = {
    none: 'py-0',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };

  const backgroundStyles = {
    default: '',
    muted: 'bg-muted',
    primary: 'bg-primary text-primary-foreground',
    gradient: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
    dark: 'bg-zinc-900 text-white',
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
      <div className={cn(fullWidth ? 'w-full px-4' : 'max-w-7xl mx-auto px-4')}>
        {children}
      </div>
    </section>
  );
};
