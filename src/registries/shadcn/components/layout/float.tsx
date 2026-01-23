'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Float = ({ element, children }: ComponentRenderProps) => {
  const {
    position = 'right',
    offset = 0,
    clearfix = true,
    style
  } = element.props;

  const offsetNum = typeof offset === 'number' ? offset : Number(offset) || 0;

  const floatClasses = {
    left: 'float-left',
    right: 'float-right',
    none: 'float-none',
  };

  const marginClasses = {
    left: { marginRight: `${offsetNum * 0.25}rem`, marginBottom: `${offsetNum * 0.25}rem` },
    right: { marginLeft: `${offsetNum * 0.25}rem`, marginBottom: `${offsetNum * 0.25}rem` },
    none: {},
  };

  return (
    <>
      <div
        className={cn(
          floatClasses[(position as keyof typeof floatClasses) || 'right']
        )}
        style={{
          ...marginClasses[(position as keyof typeof marginClasses) || 'right'],
          ...style as React.CSSProperties,
        }}
      >
        {children}
      </div>
      {clearfix && <div className="clear-both" />}
    </>
  );
};
