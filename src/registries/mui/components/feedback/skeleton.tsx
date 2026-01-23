'use client';

import React from 'react';
import { Skeleton as MuiSkeleton } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Skeleton = ({ element }: ComponentRenderProps) => {
  const {
    variant = 'text',
    width,
    height,
    animation = 'pulse',
    sx,
    style
  } = element.props;

  return (
    <MuiSkeleton
      variant={variant as 'text' | 'rectangular' | 'rounded' | 'circular'}
      width={width as number | string}
      height={height as number | string}
      animation={animation as 'pulse' | 'wave' | false}
      sx={sx as any}
      style={style as React.CSSProperties}
    />
  );
};
