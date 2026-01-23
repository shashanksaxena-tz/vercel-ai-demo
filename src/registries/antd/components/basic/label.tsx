'use client';

import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Text } = Typography;

export const Label = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    htmlFor,
    required,
    disabled,
    className,
    style
  } = element.props;

  return (
    <label
      htmlFor={htmlFor as string}
      className={className as string}
      style={{
        display: 'block',
        marginBottom: 4,
        ...style as React.CSSProperties
      }}
    >
      <Text
        strong
        disabled={disabled as boolean}
        style={{ fontSize: 14 }}
      >
        {(content as string) || children}
        {required && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
      </Text>
    </label>
  );
};
