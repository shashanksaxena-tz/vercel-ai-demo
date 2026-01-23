'use client';

import React from 'react';
import { Badge as AntBadge } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Badge = ({ element, children }: ComponentRenderProps) => {
  const {
    count,
    text,
    status,
    color,
    dot,
    showZero,
    overflowCount,
    size,
    offset,
    title,
    className,
    style
  } = element.props;

  return (
    <AntBadge
      count={count as number}
      text={text as string}
      status={status as 'success' | 'processing' | 'default' | 'error' | 'warning'}
      color={color as string}
      dot={dot as boolean}
      showZero={showZero as boolean}
      overflowCount={overflowCount as number}
      size={size as 'default' | 'small'}
      offset={offset as [number, number]}
      title={title as string}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {children}
    </AntBadge>
  );
};
