'use client';

import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Text } = Typography;

export const Caption = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    type = 'secondary',
    className,
    style
  } = element.props;

  return (
    <Text
      type={type as 'secondary' | 'success' | 'warning' | 'danger'}
      className={className as string}
      style={{
        fontSize: 12,
        ...style as React.CSSProperties
      }}
    >
      {(content as string) || children}
    </Text>
  );
};
