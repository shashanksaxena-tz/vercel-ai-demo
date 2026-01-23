'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Code = ({ element, children }: ComponentRenderProps) => {
  const { content, inline = true, className, style } = element.props;

  if (inline) {
    return (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className as string
        )}
        style={style as React.CSSProperties}
      >
        {(content as React.ReactNode) || children}
      </code>
    );
  }

  return (
    <pre
      className={cn(
        'relative rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto',
        className as string
      )}
      style={style as React.CSSProperties}
    >
      <code>{(content as React.ReactNode) || children}</code>
    </pre>
  );
};
