'use client';

import React from 'react';
import { Badge } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Dot = ({ element }: ComponentRenderProps) => {
  const {
    color = '#1890ff',
    size = 8,
    status,
    className,
    style
  } = element.props;

  if (status) {
    return (
      <Badge
        status={status as 'success' | 'processing' | 'default' | 'error' | 'warning'}
        className={className as string}
        style={style as React.CSSProperties}
      />
    );
  }

  return (
    <span
      className={className as string}
      style={{
        display: 'inline-block',
        width: size as number,
        height: size as number,
        borderRadius: '50%',
        backgroundColor: color as string,
        ...style as React.CSSProperties
      }}
    />
  );
};
