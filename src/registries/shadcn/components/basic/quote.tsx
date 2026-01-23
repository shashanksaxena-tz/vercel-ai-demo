'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Quote = ({ element, children }: ComponentRenderProps) => {
  const { content, cite, author, variant = 'default', className, style } = element.props;

  const variants = {
    default: 'border-l-4 border-border pl-6 italic',
    primary: 'border-l-4 border-primary pl-6 italic',
    minimal: 'pl-4 italic text-muted-foreground',
    card: 'bg-muted p-4 rounded-lg italic',
  };

  return (
    <figure className={cn('my-6', className as string)} style={style as React.CSSProperties}>
      <blockquote
        className={cn(variants[(variant as keyof typeof variants)] || variants.default)}
        cite={cite as string}
      >
        <p className="text-lg">{(content as React.ReactNode) || children}</p>
      </blockquote>
      {author && (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          &mdash; {author as string}
          {cite && (
            <cite className="ml-1 not-italic">, {cite as string}</cite>
          )}
        </figcaption>
      )}
    </figure>
  );
};
