'use client';

import React from 'react';
import { Divider } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Separator = ({ element }: ComponentRenderProps) => {
  const {
    orientation = 'horizontal',
    dashed,
    className,
    style
  } = element.props;

  return (
    <Divider
      type={orientation as 'horizontal' | 'vertical'}
      dashed={dashed as boolean}
      className={className as string}
      style={{
        margin: orientation === 'vertical' ? '0 8px' : '12px 0',
        ...style as React.CSSProperties
      }}
    />
  );
};
