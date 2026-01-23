'use client';

import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Text } = Typography;

export const Code = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    copyable,
    className,
    style
  } = element.props;

  return (
    <Text
      code
      copyable={copyable as boolean}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {(content as string) || children}
    </Text>
  );
};
