'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Box = ({ element, children }: ComponentRenderProps) => {
  const {
    padding,
    paddingX,
    paddingY,
    margin,
    marginX,
    marginY,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    background,
    border,
    borderRadius,
    shadow,
    overflow,
    display,
    style
  } = element.props;

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner',
  };

  const overflowClasses = {
    auto: 'overflow-auto',
    hidden: 'overflow-hidden',
    visible: 'overflow-visible',
    scroll: 'overflow-scroll',
    'x-auto': 'overflow-x-auto',
    'y-auto': 'overflow-y-auto',
  };

  const displayClasses = {
    block: 'block',
    inline: 'inline',
    'inline-block': 'inline-block',
    flex: 'flex',
    'inline-flex': 'inline-flex',
    grid: 'grid',
    hidden: 'hidden',
  };

  const pNum = padding !== undefined ? (typeof padding === 'number' ? padding : Number(padding)) : undefined;
  const pxNum = paddingX !== undefined ? (typeof paddingX === 'number' ? paddingX : Number(paddingX)) : undefined;
  const pyNum = paddingY !== undefined ? (typeof paddingY === 'number' ? paddingY : Number(paddingY)) : undefined;
  const mNum = margin !== undefined ? (typeof margin === 'number' ? margin : Number(margin)) : undefined;
  const mxNum = marginX !== undefined ? (typeof marginX === 'number' ? marginX : Number(marginX)) : undefined;
  const myNum = marginY !== undefined ? (typeof marginY === 'number' ? marginY : Number(marginY)) : undefined;

  return (
    <div
      className={cn(
        shadow ? shadowClasses[shadow as keyof typeof shadowClasses] : undefined,
        overflow ? overflowClasses[overflow as keyof typeof overflowClasses] : undefined,
        display ? displayClasses[display as keyof typeof displayClasses] : undefined,
        (border as boolean) && 'border',
        (background as string) === 'muted' && 'bg-muted',
        (background as string) === 'card' && 'bg-card',
        (background as string) === 'primary' && 'bg-primary text-primary-foreground',
        (background as string) === 'secondary' && 'bg-secondary text-secondary-foreground',
        (borderRadius as string) === 'sm' && 'rounded-sm',
        (borderRadius as string) === 'md' && 'rounded-md',
        (borderRadius as string) === 'lg' && 'rounded-lg',
        (borderRadius as string) === 'xl' && 'rounded-xl',
        (borderRadius as string) === '2xl' && 'rounded-2xl',
        (borderRadius as string) === 'full' && 'rounded-full',
        (borderRadius as string) === 'none' && 'rounded-none'
      )}
      style={{
        padding: pNum !== undefined ? `${pNum * 0.25}rem` : undefined,
        paddingLeft: pxNum !== undefined ? `${pxNum * 0.25}rem` : undefined,
        paddingRight: pxNum !== undefined ? `${pxNum * 0.25}rem` : undefined,
        paddingTop: pyNum !== undefined ? `${pyNum * 0.25}rem` : undefined,
        paddingBottom: pyNum !== undefined ? `${pyNum * 0.25}rem` : undefined,
        margin: mNum !== undefined ? `${mNum * 0.25}rem` : undefined,
        marginLeft: mxNum !== undefined ? `${mxNum * 0.25}rem` : undefined,
        marginRight: mxNum !== undefined ? `${mxNum * 0.25}rem` : undefined,
        marginTop: myNum !== undefined ? `${myNum * 0.25}rem` : undefined,
        marginBottom: myNum !== undefined ? `${myNum * 0.25}rem` : undefined,
        width: width as string | number,
        height: height as string | number,
        minWidth: minWidth as string | number,
        minHeight: minHeight as string | number,
        maxWidth: maxWidth as string | number,
        maxHeight: maxHeight as string | number,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
