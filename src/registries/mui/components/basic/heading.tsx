'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Heading = ({ element, children }: ComponentRenderProps) => {
  const {
    level = 1,
    content,
    color,
    align,
    gutterBottom = true,
    sx,
    style
  } = element.props;

  const variantMap: Record<number, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  };

  return (
    <Typography
      variant={variantMap[level as number] || 'h1'}
      color={color as any}
      align={align as any}
      gutterBottom={gutterBottom as boolean}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Typography>
  );
};
