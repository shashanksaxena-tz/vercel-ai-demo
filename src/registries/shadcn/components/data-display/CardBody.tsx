'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CardBody = ({ element, children }: ComponentRenderProps) => {
  const {
    padding = 'default',
    divided = false,
    style,
  } = element.props;

  const paddingStyles = {
    none: '',
    sm: 'px-4 py-3',
    default: 'px-6 py-4',
    lg: 'px-8 py-6',
  };

  return (
    <div
      className={cn(
        paddingStyles[(padding as keyof typeof paddingStyles) || 'default'],
        divided && 'border-t'
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
