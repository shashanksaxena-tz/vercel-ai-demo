'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Badge = ({ element, children }: ComponentRenderProps) => {
  const {
    variant = 'default',
    size = 'default',
    label,
    children: propsChildren,
    glow,
    pulse,
    dot,
    dotColor,
    icon,
    removable,
    onRemove,
    style
  } = element.props;

  const content = label || propsChildren || children;

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const variantStyles = {
    default: 'bg-neutral-800 text-neutral-300 border border-neutral-700',
    primary: 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30',
    secondary: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    error: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    destructive: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    outline: 'bg-transparent text-neutral-300 border border-neutral-600',
    glass: 'bg-white/5 backdrop-blur-md text-white border border-white/10',
    neon: 'bg-transparent text-cyan-400 border border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]',
    gradient: 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0',
  };

  const glowStyles = {
    cyan: 'shadow-[0_0_10px_rgba(6,182,212,0.4)]',
    purple: 'shadow-[0_0_10px_rgba(168,85,247,0.4)]',
    emerald: 'shadow-[0_0_10px_rgba(52,211,153,0.4)]',
    amber: 'shadow-[0_0_10px_rgba(251,191,36,0.4)]',
    rose: 'shadow-[0_0_10px_rgba(244,63,94,0.4)]',
  };

  const dotColors = {
    default: 'bg-neutral-400',
    cyan: 'bg-cyan-400',
    purple: 'bg-purple-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    red: 'bg-red-500',
    green: 'bg-green-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        glow ? glowStyles[(glow as keyof typeof glowStyles) || 'cyan'] : '',
        pulse ? 'animate-pulse' : ''
      )}
      style={style as React.CSSProperties}
    >
      {Boolean(dot) && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            dotColors[(dotColor as keyof typeof dotColors) || 'default']
          )}
        />
      )}
      {Boolean(icon) && <span className="flex-shrink-0">{icon as React.ReactNode}</span>}
      {content as React.ReactNode}
      {Boolean(removable) && (
        <button
          className="ml-0.5 hover:text-white transition-colors"
          onClick={() => onRemove && (onRemove as () => void)()}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export const StatusBadge = ({ element, children }: ComponentRenderProps) => {
  const { status = 'default' } = element.props;
  const statusMap: Record<string, string> = {
    online: 'success',
    offline: 'error',
    away: 'warning',
    busy: 'error',
    active: 'success',
    inactive: 'default',
    pending: 'warning',
    completed: 'success',
    failed: 'error',
  };
  return (
    <Badge
      element={{
        ...element,
        props: {
          ...element.props,
          variant: statusMap[status as string] || 'default',
          dot: true,
          dotColor: statusMap[status as string] || 'default',
        }
      }}
      children={children}
    />
  );
};

export const CountBadge = ({ element }: ComponentRenderProps) => {
  const { count = 0, max = 99 } = element.props;
  const displayCount = (count as number) > (max as number) ? `${max}+` : count;
  return (
    <Badge
      element={{
        ...element,
        props: {
          ...element.props,
          label: displayCount,
          variant: 'primary',
          size: 'sm',
        }
      }}
    />
  );
};

export const TagBadge = ({ element, children }: ComponentRenderProps) => {
  return (
    <Badge
      element={{
        ...element,
        props: {
          ...element.props,
          variant: 'outline',
          removable: true,
        }
      }}
      children={children}
    />
  );
};
