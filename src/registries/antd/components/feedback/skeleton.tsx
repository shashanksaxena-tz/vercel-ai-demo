'use client';

import React from 'react';
import { Skeleton as AntSkeleton } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Skeleton = ({ element, children }: ComponentRenderProps) => {
  const {
    active = true,
    loading = true,
    avatar,
    title = true,
    paragraph = true,
    round,
    rows = 3,
    width,
    style
  } = element.props;

  return (
    <AntSkeleton
      active={active as boolean}
      loading={loading as boolean}
      avatar={avatar as boolean | { shape?: 'circle' | 'square'; size?: 'large' | 'small' | 'default' | number }}
      title={title as boolean | { width?: number | string }}
      paragraph={paragraph as boolean | { rows?: number; width?: number | string | (number | string)[] }}
      round={round as boolean}
      style={style as React.CSSProperties}
    >
      {children}
    </AntSkeleton>
  );
};
