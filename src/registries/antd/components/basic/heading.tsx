'use client';

import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Title } = Typography;

export const Heading = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    level = 1,
    type,
    copyable,
    ellipsis,
    className,
    style
  } = element.props;

  return (
    <Title
      level={level as 1 | 2 | 3 | 4 | 5}
      type={type as 'secondary' | 'success' | 'warning' | 'danger'}
      copyable={copyable as boolean}
      ellipsis={ellipsis as boolean | { rows?: number; expandable?: boolean }}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {(content as string) || children}
    </Title>
  );
};
