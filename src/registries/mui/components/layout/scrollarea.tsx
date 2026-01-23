'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const ScrollArea = ({ element, children }: ComponentRenderProps) => {
  const {
    height,
    maxHeight,
    direction = 'vertical',
    hideScrollbar,
    sx,
    style
  } = element.props;

  return (
    <Box
      sx={{
        height,
        maxHeight,
        overflowY: direction === 'vertical' || direction === 'both' ? 'auto' : 'hidden',
        overflowX: direction === 'horizontal' || direction === 'both' ? 'auto' : 'hidden',
        ...(hideScrollbar && {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }),
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {children}
    </Box>
  );
};
