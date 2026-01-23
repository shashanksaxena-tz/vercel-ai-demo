'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Indicator = ({ element, children }: ComponentRenderProps) => {
  const {
    color = 'success.main',
    position = 'top-right',
    size = 10,
    withBorder = true,
    sx,
    style
  } = element.props;

  const positionStyles: Record<string, any> = {
    'top-right': { top: 0, right: 0 },
    'top-left': { top: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {children}
      <Box
        sx={{
          position: 'absolute',
          width: size as number,
          height: size as number,
          borderRadius: '50%',
          backgroundColor: color as string,
          border: withBorder ? '2px solid white' : 'none',
          ...positionStyles[position as string],
          transform: 'translate(25%, -25%)',
        }}
      />
    </Box>
  );
};
