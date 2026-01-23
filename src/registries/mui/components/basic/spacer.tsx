'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Spacer = ({ element }: ComponentRenderProps) => {
  const {
    size = 2,
    axis = 'vertical',
    sx,
    style
  } = element.props;

  const spacing = (size as number) * 8;

  return (
    <Box
      sx={{
        width: axis === 'horizontal' ? spacing : 'auto',
        height: axis === 'vertical' ? spacing : 'auto',
        flexShrink: 0,
        ...sx as any
      }}
      style={style as React.CSSProperties}
    />
  );
};
