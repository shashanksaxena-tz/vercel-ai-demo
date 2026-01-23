import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Logo = ({ element, onAction }: ComponentRenderProps) => {
  const {
    src,
    alt = 'Logo',
    text,
    size = 'default',
    href,
    action,
    style
  } = element.props;

  const sizeStyles = {
    sm: { img: 'h-6', text: 'text-lg' },
    default: { img: 'h-8', text: 'text-xl' },
    lg: { img: 'h-10', text: 'text-2xl' },
    xl: { img: 'h-12', text: 'text-3xl' },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  const content = (
    <div className="flex items-center gap-2" style={style as React.CSSProperties}>
      {src ? (
        <img
          src={src as string}
          alt={alt as string}
          className={cn(sizes.img, 'w-auto object-contain')}
        />
      ) : null}
      {text ? (
        <span className={cn('font-bold', sizes.text)}>{text as string}</span>
      ) : null}
    </div>
  );

  if (href || action) {
    return (
      <a
        href={href as string || '#'}
        onClick={handleClick}
        className="inline-flex cursor-pointer hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return content;
};
