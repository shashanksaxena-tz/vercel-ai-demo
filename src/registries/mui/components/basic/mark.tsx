'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Mark = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    color = 'warning.light',
    sx,
    style
  } = element.props;

  return (
    <Box
      component="mark"
      sx={{
        backgroundColor: color as string,
        padding: '0.1em 0.2em',
        borderRadius: 0.25,
        color: 'inherit',
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Box>
  );
};
