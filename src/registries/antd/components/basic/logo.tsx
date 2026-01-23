'use client';

import React from 'react';
import { Space, Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Text } = Typography;

export const Logo = ({ element, onAction }: ComponentRenderProps) => {
  const {
    src,
    alt,
    text,
    size = 'default',
    action,
    href,
    className,
    style
  } = element.props;

  // Map sizes
  let imgSize = 32;
  let fontSize = 16;
  switch (size) {
    case 'sm':
      imgSize = 24;
      fontSize = 14;
      break;
    case 'lg':
      imgSize = 48;
      fontSize = 20;
      break;
    case 'xl':
      imgSize = 64;
      fontSize = 24;
      break;
    default:
      imgSize = 32;
      fontSize = 16;
  }

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    } else if (href) {
      window.location.href = href as string;
    }
  };

  const content = (
    <Space
      className={className as string}
      style={{
        cursor: action || href ? 'pointer' : 'default',
        ...style as React.CSSProperties
      }}
      onClick={handleClick}
    >
      {src && (
        <img
          src={src as string}
          alt={alt as string || 'Logo'}
          style={{ height: imgSize, width: 'auto' }}
        />
      )}
      {text && (
        <Text strong style={{ fontSize }}>
          {text as string}
        </Text>
      )}
    </Space>
  );

  return content;
};
