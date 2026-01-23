'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatBubble = ({ element, children }: ComponentRenderProps) => {
  const {
    text,
    variant = 'default',
    position = 'left',
    style
  } = element.props;

  const isRight = position === 'right';

  const variants = {
    default: isRight ? 'bg-primary text-primary-foreground' : 'bg-muted',
    outline: 'bg-transparent border',
    ghost: 'bg-muted/50',
  };

  return (
    <div
      className={cn(
        'px-4 py-2 rounded-2xl max-w-[80%] inline-block',
        variants[variant as keyof typeof variants] || variants.default,
        isRight ? 'rounded-br-md' : 'rounded-bl-md'
      )}
      style={style as React.CSSProperties}
    >
      {text ? <p className="text-sm">{text as string}</p> : children}
    </div>
  );
};
