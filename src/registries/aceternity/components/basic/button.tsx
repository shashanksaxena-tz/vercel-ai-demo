'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Button = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    variant = 'primary',
    size = 'default',
    label,
    children: propsChildren,
    action,
    disabled,
    loading,
    icon,
    iconPosition = 'left',
    fullWidth,
    style
  } = element.props;

  const content = label || propsChildren || children;

  const handleClick = () => {
    if (disabled || loading) return;
    if (action && onAction) {
      onAction({ name: action as string });
    } else if (element.props.onClick && onAction) {
      onAction({ name: element.props.onClick as string });
    }
  };

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2 font-medium
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-neutral-900
  `;

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    default: 'px-5 py-2.5 text-sm rounded-lg',
    lg: 'px-7 py-3.5 text-base rounded-xl',
    xl: 'px-9 py-4 text-lg rounded-xl',
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-cyan-500 to-purple-500 text-white
      hover:from-cyan-400 hover:to-purple-400
      hover:shadow-lg hover:shadow-cyan-500/25
      active:scale-[0.98]
    `,
    secondary: `
      bg-neutral-800 text-white border border-neutral-700
      hover:bg-neutral-700 hover:border-neutral-600
      hover:shadow-lg hover:shadow-neutral-900/50
    `,
    outline: `
      bg-transparent text-cyan-400 border border-cyan-500/50
      hover:bg-cyan-500/10 hover:border-cyan-400
      hover:shadow-lg hover:shadow-cyan-500/20
    `,
    ghost: `
      bg-transparent text-neutral-300
      hover:bg-neutral-800 hover:text-white
    `,
    danger: `
      bg-gradient-to-r from-rose-500 to-red-500 text-white
      hover:from-rose-400 hover:to-red-400
      hover:shadow-lg hover:shadow-rose-500/25
    `,
    success: `
      bg-gradient-to-r from-emerald-500 to-green-500 text-white
      hover:from-emerald-400 hover:to-green-400
      hover:shadow-lg hover:shadow-emerald-500/25
    `,
    glow: `
      bg-neutral-900 text-cyan-400 border border-cyan-500/30
      hover:border-cyan-400 hover:text-cyan-300
      shadow-[0_0_15px_rgba(6,182,212,0.3)]
      hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]
    `,
    neon: `
      bg-transparent text-purple-400 border-2 border-purple-500
      hover:bg-purple-500/10 hover:text-purple-300
      shadow-[0_0_10px_rgba(168,85,247,0.4),inset_0_0_10px_rgba(168,85,247,0.1)]
      hover:shadow-[0_0_20px_rgba(168,85,247,0.6),inset_0_0_15px_rgba(168,85,247,0.2)]
    `,
    glass: `
      bg-white/5 backdrop-blur-md text-white border border-white/10
      hover:bg-white/10 hover:border-white/20
    `,
    link: `
      bg-transparent text-cyan-400 underline-offset-4
      hover:underline hover:text-cyan-300
    `,
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
        variantStyles[(variant as keyof typeof variantStyles) || 'primary'],
        fullWidth ? 'w-full' : '',
        loading ? 'cursor-wait' : ''
      )}
      onClick={handleClick}
      disabled={disabled as boolean}
      style={style as React.CSSProperties}
    >
      {Boolean(loading) && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {Boolean(icon && iconPosition === 'left' && !loading) && <span>{icon as React.ReactNode}</span>}
      {content as React.ReactNode}
      {Boolean(icon && iconPosition === 'right') && <span>{icon as React.ReactNode}</span>}
    </button>
  );
};
