'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Logo = ({ element, onAction }: ComponentRenderProps) => {
  const { src, alt = 'Logo', text, size = 'default', href, action, className, style } = element.props;

  const sizes = {
    sm: { img: 'h-6', text: 'text-lg' },
    default: { img: 'h-8', text: 'text-xl' },
    lg: { img: 'h-10', text: 'text-2xl' },
    xl: { img: 'h-12', text: 'text-3xl' },
  };

  const sizeConfig = sizes[(size as keyof typeof sizes)] || sizes.default;

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  const content = (
    <div
      className={cn('flex items-center gap-2', className as string)}
      style={style as React.CSSProperties}
    >
      {src && (
        <img
          src={src as string}
          alt={alt as string}
          className={cn(sizeConfig.img, 'w-auto object-contain')}
        />
      )}
      {text && (
        <span className={cn('font-bold', sizeConfig.text)}>{text as string}</span>
      )}
    </div>
  );

  if (href || action) {
    return (
      <a
        href={(href as string) || '#'}
        onClick={handleClick}
        className="inline-flex cursor-pointer hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return content;
};
