'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Image = ({ element }: ComponentRenderProps) => {
  const {
    src,
    alt = '',
    width,
    height,
    aspectRatio,
    objectFit = 'cover',
    variant = 'default',
    rounded,
    shadow,
    glow,
    hover,
    overlay,
    overlayText,
    caption,
    loading = 'lazy',
    style
  } = element.props;

  const variantStyles = {
    default: '',
    rounded: 'rounded-lg',
    circle: 'rounded-full',
    card: 'rounded-xl',
  };

  const shadowStyles = {
    sm: 'shadow-md',
    default: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl',
    glow: 'shadow-[0_0_30px_rgba(0,0,0,0.5)]',
  };

  const glowStyles = {
    cyan: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    purple: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    emerald: 'shadow-[0_0_30px_rgba(52,211,153,0.3)]',
    amber: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]',
    pink: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
  };

  const hoverStyles = {
    zoom: 'group-hover:scale-110',
    lift: 'group-hover:-translate-y-2',
    glow: '',
    brighten: 'group-hover:brightness-110',
    dim: 'group-hover:brightness-75',
  };

  const aspectRatioStyles = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
    ultrawide: 'aspect-[21/9]',
  };

  const objectFitStyles = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  const overlayStyles = {
    dark: 'bg-black/50',
    light: 'bg-white/30',
    gradient: 'bg-gradient-to-t from-black/80 via-transparent to-transparent',
    'gradient-top': 'bg-gradient-to-b from-black/80 via-transparent to-transparent',
    blur: 'backdrop-blur-sm bg-black/20',
  };

  return (
    <figure className="relative" style={style as React.CSSProperties}>
      <div
        className={cn(
          'relative overflow-hidden group',
          variantStyles[(variant as keyof typeof variantStyles) || 'default'],
          rounded ? 'rounded-' : '' + rounded,
          shadow ? shadowStyles[(shadow as keyof typeof shadowStyles) || 'default'] : '',
          glow ? glowStyles[(glow as keyof typeof glowStyles) || 'cyan'] : '',
          hover === 'glow' && 'transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]',
          hover === 'lift' && 'transition-transform duration-300'
        )}
      >
        <img
          src={src as string}
          alt={alt as string}
          width={width as number}
          height={height as number}
          loading={loading as 'lazy' | 'eager'}
          className={cn(
            'w-full h-full transition-all duration-500',
            objectFitStyles[(objectFit as keyof typeof objectFitStyles) || 'cover'],
            aspectRatio ? aspectRatioStyles[(aspectRatio as keyof typeof aspectRatioStyles)] : '',
            hover ? hoverStyles[(hover as keyof typeof hoverStyles)] : ''
          )}
        />
        {Boolean(overlay) && (
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-300',
              overlayStyles[(overlay as keyof typeof overlayStyles) || 'dark'],
              'flex items-end justify-start p-4'
            )}
          >
            {Boolean(overlayText) && (
              <span className="text-white font-medium">{overlayText as string}</span>
            )}
          </div>
        )}
      </div>
      {Boolean(caption) && (
        <figcaption className="mt-2 text-sm text-neutral-500 text-center">
          {caption as string}
        </figcaption>
      )}
    </figure>
  );
};

export const ImageGallery = ({ element, children }: ComponentRenderProps) => {
  const { columns = 3, gap = 4 } = element.props;

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${(gap as number) * 0.25}rem`,
      }}
    >
      {children}
    </div>
  );
};

export const BackgroundImage = ({ element, children }: ComponentRenderProps) => {
  const {
    src,
    overlay = 'dark',
    fixed,
    blur,
    style
  } = element.props;

  const overlayStyles = {
    dark: 'bg-black/60',
    light: 'bg-white/40',
    gradient: 'bg-gradient-to-b from-black/80 via-black/40 to-black/80',
    none: '',
  };

  return (
    <div
      className={cn(
        'relative min-h-[400px] bg-cover bg-center',
        fixed ? 'bg-fixed' : '',
        blur ? 'backdrop-blur-sm' : ''
      )}
      style={{
        backgroundImage: `url(${src})`,
        ...(style as React.CSSProperties),
      }}
    >
      <div className={cn('absolute inset-0', overlayStyles[(overlay as keyof typeof overlayStyles) || 'dark'])} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const AspectRatio = ({ element, children }: ComponentRenderProps) => {
  const { ratio = '16/9', style } = element.props;

  const ratioStyles = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '21/9': 'aspect-[21/9]',
    '3/4': 'aspect-[3/4]',
    '9/16': 'aspect-[9/16]',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        ratioStyles[(ratio as keyof typeof ratioStyles) || '16/9']
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
