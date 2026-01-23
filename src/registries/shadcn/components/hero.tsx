import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Hero = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    align = 'center',
    size = 'lg',
    background = 'default',
    backgroundImage,
    overlay = false,
    style
  } = element.props;

  const sizeStyles = {
    sm: 'min-h-[400px] py-16',
    md: 'min-h-[500px] py-20',
    lg: 'min-h-[600px] py-24',
    xl: 'min-h-[700px] py-32',
    full: 'min-h-screen py-24',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const backgroundStyles = {
    default: '',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-br from-primary/20 via-background to-secondary/20',
    dark: 'bg-zinc-900 text-white',
  };

  return (
    <section
      className={cn(
        'relative w-full flex flex-col justify-center',
        sizeStyles[(size as keyof typeof sizeStyles) || 'lg'],
        !backgroundImage && backgroundStyles[(background as keyof typeof backgroundStyles) || 'default']
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...(style as React.CSSProperties),
      }}
    >
      {overlay && backgroundImage ? (
        <div className="absolute inset-0 bg-black/50" />
      ) : null}
      <div
        className={cn(
          'relative z-10 max-w-4xl mx-auto px-4 flex flex-col gap-6',
          alignStyles[(align as keyof typeof alignStyles) || 'center']
        )}
      >
        {subtitle ? (
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {subtitle as string}
          </span>
        ) : null}
        {title ? (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {title as string}
          </h1>
        ) : null}
        {description ? (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            {description as string}
          </p>
        ) : null}
        {children ? (
          <div className={cn('flex flex-wrap gap-4 mt-4', align === 'center' ? 'justify-center' : '')}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
};
