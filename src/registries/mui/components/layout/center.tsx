'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Center = ({ element, children }: ComponentRenderProps) => {
  const {
    inline,
    sx,
    style
  } = element.props;

  return (
    <Box
      sx={{
        display: inline ? 'inline-flex' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {children}
    </Box>
  );
};
