'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Paragraph = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    color,
    align,
    gutterBottom,
    sx,
    style
  } = element.props;

  return (
    <Typography
      variant="body1"
      component="p"
      color={color as any}
      align={align as any}
      gutterBottom={gutterBottom as boolean}
      sx={{ mb: 2, ...sx as any }}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Typography>
  );
};
