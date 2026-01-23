'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Anchor = ({ element, children, onAction }: ComponentRenderProps) => {
  const { href, label, external = false, action, className, style } = element.props;

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
        'font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors',
        className as string
      )}
      style={style as React.CSSProperties}
      onClick={handleClick}
    >
      {(label as string) || children}
    </a>
  );
};
