'use client';

import React from 'react';
import { Badge, Space, Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Text } = Typography;

export const Indicator = ({ element, children }: ComponentRenderProps) => {
  const {
    status = 'default',
    label,
    pulse,
    className,
    style
  } = element.props;

  const statusColors: Record<string, string> = {
    success: '#52c41a',
    error: '#ff4d4f',
    warning: '#faad14',
    processing: '#1890ff',
    default: '#d9d9d9',
    info: '#1890ff'
  };

  return (
    <Space
      className={className as string}
      style={style as React.CSSProperties}
    >
      <Badge
        status={status as 'success' | 'processing' | 'default' | 'error' | 'warning'}
        style={pulse ? { animation: 'pulse 2s infinite' } : undefined}
      />
      {(label || children) && (
        <Text>{(label as string) || children}</Text>
      )}
    </Space>
  );
};
