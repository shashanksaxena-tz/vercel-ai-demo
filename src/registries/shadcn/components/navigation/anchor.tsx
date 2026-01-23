'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Anchor = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    label,
    href,
    action,
    offset = 0,
    smooth = true,
    showIcon,
    variant = 'default',
    style
  } = element.props;

  const variants = {
    default: 'text-foreground hover:text-primary',
    subtle: 'text-muted-foreground hover:text-foreground',
    heading: 'text-foreground group',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (action) {
      e.preventDefault();
      onAction?.({ name: action as string });
      return;
    }

    const targetId = href ? (href as string).replace('#', '') : (id as string);
    if (targetId) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - (offset as number);
        window.scrollTo({
          top,
          behavior: smooth ? 'smooth' : 'auto',
        });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <a
      id={id as string}
      href={(href as string) || `#${id}`}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1 transition-colors',
        variants[variant as keyof typeof variants] || variants.default
      )}
      style={style as React.CSSProperties}
    >
      {label && <span>{label as string}</span>}
      {children}
      {showIcon && (
        <svg
          className={cn(
            'w-4 h-4',
            variant === 'heading' && 'opacity-0 group-hover:opacity-100 transition-opacity'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      )}
    </a>
  );
};
