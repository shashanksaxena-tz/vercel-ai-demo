'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const normalizeName = (name: string) => {
  return name
    .split(/[-_\s]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
};

export const Icon = ({ element }: ComponentRenderProps) => {
  const {
    name,
    size = 'default',
    color,
    glow,
    spin,
    pulse,
    bounce,
    variant = 'default',
    style
  } = element.props;

  if (!name) return null;

  const pascalName = normalizeName(name as string);
  // @ts-expect-error - Dynamic access
  const IconComponent = LucideIcons[pascalName] || LucideIcons.HelpCircle;

  const sizeStyles = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    default: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
    '3xl': 'w-12 h-12',
  };

  const colorStyles = {
    default: 'text-neutral-400',
    white: 'text-white',
    muted: 'text-neutral-500',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400',
    indigo: 'text-indigo-400',
    teal: 'text-teal-400',
  };

  const glowStyles = {
    cyan: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]',
    purple: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]',
    pink: 'drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]',
    emerald: 'drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    amber: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    white: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]',
  };

  const variantWrapperStyles = {
    default: '',
    circle: 'p-2 rounded-full bg-neutral-800 border border-neutral-700',
    square: 'p-2 rounded-lg bg-neutral-800 border border-neutral-700',
    filled: 'p-2 rounded-lg bg-cyan-500/20',
    outline: 'p-2 rounded-lg border border-neutral-600',
    glass: 'p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10',
    glow: 'p-2 rounded-lg bg-neutral-800 shadow-[0_0_15px_rgba(6,182,212,0.3)]',
  };

  const iconElement = (
    <IconComponent
      className={cn(
        sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
        colorStyles[(color as keyof typeof colorStyles) || 'default'],
        glow ? glowStyles[(glow as keyof typeof glowStyles) || 'cyan'] : '',
        spin ? 'animate-spin' : '',
        pulse ? 'animate-pulse' : '',
        bounce ? 'animate-bounce' : ''
      )}
      style={style as React.CSSProperties}
    />
  );

  if (variant !== 'default') {
    return (
      <span className={cn('inline-flex items-center justify-center', variantWrapperStyles[(variant as keyof typeof variantWrapperStyles)])}>
        {iconElement}
      </span>
    );
  }

  return iconElement;
};

export const IconButton = ({ element, onAction }: ComponentRenderProps) => {
  const { name, action, disabled, tooltip, variant = 'ghost', size = 'default', color, style } = element.props;

  const handleClick = () => {
    if (disabled) return;
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  const sizeStyles = {
    sm: 'p-1.5',
    default: 'p-2',
    lg: 'p-3',
  };

  const variantStyles = {
    ghost: 'hover:bg-neutral-800 text-neutral-400 hover:text-white',
    filled: 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white',
    outline: 'border border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-white',
    glow: 'bg-neutral-800 text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-200',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
        variantStyles[(variant as keyof typeof variantStyles) || 'ghost'],
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      )}
      onClick={handleClick}
      disabled={disabled as boolean}
      title={tooltip as string}
      style={style as React.CSSProperties}
    >
      <Icon element={{ ...element, props: { name, size, color } }} />
    </button>
  );
};

export const AnimatedIcon = ({ element }: ComponentRenderProps) => {
  const { animation = 'pulse' } = element.props;
  const animationMap: Record<string, string> = {
    pulse: 'pulse',
    spin: 'spin',
    bounce: 'bounce',
  };
  return <Icon element={{ ...element, props: { ...element.props, [animationMap[animation as string] || 'pulse']: true } }} />;
};
