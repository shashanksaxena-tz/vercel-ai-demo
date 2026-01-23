'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Dot = ({ element }: ComponentRenderProps) => {
  const {
    color = 'primary.main',
    size = 8,
    pulse,
    sx,
    style
  } = element.props;

  return (
    <Box
      sx={{
        display: 'inline-block',
        width: size as number,
        height: size as number,
        borderRadius: '50%',
        backgroundColor: color as string,
        animation: pulse ? 'pulse 2s infinite' : undefined,
        '@keyframes pulse': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
        ...sx as any
      }}
      style={style as React.CSSProperties}
    />
  );
};
