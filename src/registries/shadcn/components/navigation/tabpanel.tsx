'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TabPanel = ({ element, children }: ComponentRenderProps) => {
  const {
    value,
    active,
    keepMounted,
    style
  } = element.props;

  if (!active && !keepMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'mt-4 focus:outline-none',
        !active && keepMounted && 'hidden'
      )}
      style={style as React.CSSProperties}
      role="tabpanel"
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
      data-value={value}
    >
      {children}
    </div>
  );
};
