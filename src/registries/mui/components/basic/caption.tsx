'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Caption = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    color = 'text.secondary',
    align,
    sx,
    style
  } = element.props;

  return (
    <Typography
      variant="caption"
      color={color as any}
      align={align as any}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Typography>
  );
};
