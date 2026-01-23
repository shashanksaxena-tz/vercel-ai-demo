'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Text = ({ element, children }: ComponentRenderProps) => {
  const {
    variant = 'body1',
    content,
    color,
    align,
    gutterBottom,
    noWrap,
    sx,
    style
  } = element.props;

  return (
    <Typography
      variant={variant as any}
      color={color as any}
      align={align as any}
      gutterBottom={gutterBottom as boolean}
      noWrap={noWrap as boolean}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Typography>
  );
};
