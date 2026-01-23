'use client';

import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Text } = Typography;

export const Mark = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    className,
    style
  } = element.props;

  return (
    <Text
      mark
      className={className as string}
      style={style as React.CSSProperties}
    >
      {(content as string) || children}
    </Text>
  );
};
