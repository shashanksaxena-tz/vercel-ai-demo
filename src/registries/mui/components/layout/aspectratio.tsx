'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const AspectRatio = ({ element, children }: ComponentRenderProps) => {
  const {
    ratio = 16 / 9,
    maxWidth,
    sx,
    style
  } = element.props;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth,
        '&::before': {
          content: '""',
          display: 'block',
          paddingTop: `${(1 / (ratio as number)) * 100}%`,
        },
        '& > *': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {children}
    </Box>
  );
};
