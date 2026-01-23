import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Blockquote = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    cite,
    author,
    variant = 'default',
    style
  } = element.props;

  const variantStyles = {
    default: 'border-l-4 border-primary pl-4',
    filled: 'bg-muted pl-4 pr-4 py-4 rounded-lg border-l-4 border-primary',
    minimal: 'pl-4 italic',
    card: 'bg-background border rounded-lg p-6',
  };

  return (
    <figure
      className={cn(
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <blockquote className="text-lg">
        {(content as string) || children}
      </blockquote>
      {(author || cite) ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {author ? (
            <>
              — <cite className="not-italic font-medium">{author as string}</cite>
            </>
          ) : null}
          {cite ? (
            <span className="block text-xs mt-1">{cite as string}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
};
