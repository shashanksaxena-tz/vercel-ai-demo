'use client';

import React from 'react';
import { Divider } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Separator = ({ element }: ComponentRenderProps) => {
  const {
    orientation = 'horizontal',
    spacing = 2,
    sx,
    style
  } = element.props;

  return (
    <Divider
      orientation={orientation as 'horizontal' | 'vertical'}
      sx={{
        my: orientation === 'horizontal' ? spacing : 0,
        mx: orientation === 'vertical' ? spacing : 0,
        ...sx as any
      }}
      style={style as React.CSSProperties}
    />
  );
};
