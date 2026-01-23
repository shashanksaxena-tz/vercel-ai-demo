'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Flex = ({ element, children }: ComponentRenderProps) => {
  const {
    direction = 'row',
    justify = 'flex-start',
    align = 'stretch',
    wrap = 'nowrap',
    gap = 0,
    inline,
    sx,
    style
  } = element.props;

  return (
    <Box
      sx={{
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: direction as 'row' | 'column' | 'row-reverse' | 'column-reverse',
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap as 'nowrap' | 'wrap' | 'wrap-reverse',
        gap,
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {children}
    </Box>
  );
};
