'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Highlight = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    color = 'primary.light',
    sx,
    style
  } = element.props;

  return (
    <Box
      component="span"
      sx={{
        backgroundColor: color as string,
        padding: '0.1em 0.3em',
        borderRadius: 0.5,
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Box>
  );
};
