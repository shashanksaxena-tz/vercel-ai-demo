'use client';

import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ComponentRenderProps } from '@json-render/react';

export const Avatar = ({ element, children }: ComponentRenderProps) => {
  const {
    src,
    alt,
    size = 'default',
    shape = 'circle',
    icon,
    gap,
    draggable,
    className,
    style
  } = element.props;

  // Map sizes
  let antSize: number | 'small' | 'default' | 'large' = 'default';
  if (typeof size === 'number') {
    antSize = size;
  } else {
    switch (size) {
      case 'sm':
        antSize = 'small';
        break;
      case 'lg':
        antSize = 'large';
        break;
      case 'xl':
        antSize = 64;
        break;
      case '2xl':
        antSize = 80;
        break;
      default:
        antSize = 'default';
    }
  }

  return (
    <AntAvatar
      src={src as string}
      alt={alt as string}
      size={antSize}
      shape={shape as 'circle' | 'square'}
      icon={icon ? undefined : !src && !children ? <UserOutlined /> : undefined}
      gap={gap as number}
      draggable={draggable as boolean}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {children}
    </AntAvatar>
  );
};
