'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AspectRatio = ({ element, children }: ComponentRenderProps) => {
  const {
    ratio = '16/9',
    maxWidth,
    objectFit = 'cover',
    style
  } = element.props;

  const ratioMap: Record<string, string> = {
    square: '1/1',
    video: '16/9',
    portrait: '3/4',
    landscape: '4/3',
    wide: '21/9',
    ultrawide: '32/9',
    '1:1': '1/1',
    '4:3': '4/3',
    '3:2': '3/2',
    '16:9': '16/9',
    '21:9': '21/9',
  };

  const aspectRatio = ratioMap[ratio as string] || (ratio as string);

  const objectFitClasses = {
    contain: '[&>*]:object-contain',
    cover: '[&>*]:object-cover',
    fill: '[&>*]:object-fill',
    none: '[&>*]:object-none',
    'scale-down': '[&>*]:object-scale-down',
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        '[&>img]:absolute [&>img]:inset-0 [&>img]:w-full [&>img]:h-full',
        '[&>video]:absolute [&>video]:inset-0 [&>video]:w-full [&>video]:h-full',
        objectFitClasses[(objectFit as keyof typeof objectFitClasses) || 'cover']
      )}
      style={{
        aspectRatio,
        maxWidth: maxWidth as string | number,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </div>
  );
};
