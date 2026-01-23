'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Text = ({ element, children }: ComponentRenderProps) => {
  const {
    variant = 'p',
    gradient,
    glow,
    color,
    align,
    weight,
    size,
    children: propsChildren,
    style
  } = element.props;

  const content = propsChildren || children;

  const baseStyles = {
    h1: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
    h2: 'text-4xl md:text-5xl font-bold tracking-tight',
    h3: 'text-3xl md:text-4xl font-semibold',
    h4: 'text-2xl md:text-3xl font-semibold',
    h5: 'text-xl md:text-2xl font-medium',
    h6: 'text-lg md:text-xl font-medium',
    p: 'text-base text-neutral-300 leading-relaxed',
    span: 'inline',
    small: 'text-sm text-neutral-400',
    label: 'text-sm font-medium text-neutral-300',
    caption: 'text-xs text-neutral-500',
    overline: 'text-xs uppercase tracking-widest text-neutral-500',
    lead: 'text-xl text-neutral-300 leading-relaxed',
    muted: 'text-sm text-neutral-500',
    code: 'font-mono text-sm bg-neutral-800 px-1.5 py-0.5 rounded text-cyan-400',
  };

  const gradientStyles = {
    cyan: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    purple: 'bg-gradient-to-r from-purple-400 to-pink-500',
    sunset: 'bg-gradient-to-r from-orange-400 to-rose-500',
    emerald: 'bg-gradient-to-r from-emerald-400 to-cyan-500',
    gold: 'bg-gradient-to-r from-amber-400 to-yellow-500',
    aurora: 'bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500',
    fire: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500',
    ocean: 'bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
  };

  const glowStyles = {
    cyan: 'drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]',
    purple: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    pink: 'drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]',
    emerald: 'drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]',
    amber: 'drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]',
    white: 'drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]',
  };

  const colorStyles = {
    white: 'text-white',
    neutral: 'text-neutral-300',
    muted: 'text-neutral-500',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const weightStyles = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const sizeOverrides = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  };

  const isGradient = !!gradient;
  const Component = (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'small', 'label'].includes(variant as string) ? variant : 'p') as React.ElementType;

  const className = cn(
    baseStyles[(variant as keyof typeof baseStyles) || 'p'],
    isGradient ? 'bg-clip-text text-transparent' : '',
    isGradient ? gradientStyles[(gradient as keyof typeof gradientStyles) || 'cyan'] : '',
    glow ? glowStyles[(glow as keyof typeof glowStyles) || 'cyan'] : '',
    !isGradient && color ? colorStyles[(color as keyof typeof colorStyles)] : '',
    !isGradient && !color && (variant === 'p' || variant === 'span' ? 'text-neutral-300' : 'text-white'),
    align ? alignStyles[(align as keyof typeof alignStyles)] : '',
    weight ? weightStyles[(weight as keyof typeof weightStyles)] : '',
    size ? sizeOverrides[(size as keyof typeof sizeOverrides)] : ''
  );

  return (
    <Component className={className} style={style as React.CSSProperties}>
      {content as React.ReactNode}
    </Component>
  );
};

export const Heading = ({ element, children }: ComponentRenderProps) => {
  return <Text element={{ ...element, props: { ...element.props, variant: element.props.level || 'h1' } }} children={children} />;
};

export const Paragraph = ({ element, children }: ComponentRenderProps) => {
  return <Text element={{ ...element, props: { ...element.props, variant: 'p' } }} children={children} />;
};

export const GradientText = ({ element, children }: ComponentRenderProps) => {
  return <Text element={{ ...element, props: { ...element.props, gradient: element.props.gradient || 'cyan' } }} children={children} />;
};

export const GlowText = ({ element, children }: ComponentRenderProps) => {
  return <Text element={{ ...element, props: { ...element.props, glow: element.props.glow || 'cyan' } }} children={children} />;
};
