'use client';

import React, { JSX } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Heading = ({ element, children }: ComponentRenderProps) => {
  const { level = 1, content, className, style } = element.props;

  const levels = {
    1: { tag: 'h1', className: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl' },
    2: { tag: 'h2', className: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0' },
    3: { tag: 'h3', className: 'scroll-m-20 text-2xl font-semibold tracking-tight' },
    4: { tag: 'h4', className: 'scroll-m-20 text-xl font-semibold tracking-tight' },
    5: { tag: 'h5', className: 'scroll-m-20 text-lg font-semibold tracking-tight' },
    6: { tag: 'h6', className: 'scroll-m-20 text-base font-semibold tracking-tight' },
  };

  const config = levels[(level as keyof typeof levels)] || levels[1];
  const Tag = config.tag as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={cn(config.className, className as string)}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Tag>
  );
};
