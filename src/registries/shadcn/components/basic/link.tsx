'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

export const Link = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    href,
    label,
    variant = 'default',
    external = false,
    underline = 'hover',
    action,
    className,
    style
  } = element.props;

  const variants = {
    default: 'text-primary hover:text-primary/80',
    muted: 'text-muted-foreground hover:text-foreground',
    destructive: 'text-destructive hover:text-destructive/80',
  };

  const underlineStyles = {
    always: 'underline',
    hover: 'hover:underline',
    none: '',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (action && onAction) {
      e.preventDefault();
      onAction({ name: action as string });
    }
  };

  return (
    <a
      href={href as string}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-1 transition-colors',
        variants[(variant as keyof typeof variants)] || variants.default,
        underlineStyles[(underline as keyof typeof underlineStyles)] || underlineStyles.hover,
        className as string
      )}
      style={style as React.CSSProperties}
      onClick={handleClick}
    >
      {(label as string) || children}
      {external && <ExternalLink className="h-3 w-3" />}
    </a>
  );
};
