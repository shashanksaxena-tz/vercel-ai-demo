'use client';

import React from 'react';
import { Divider as MuiDivider } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Divider = ({ element, children }: ComponentRenderProps) => {
  const {
    orientation = 'horizontal',
    variant = 'fullWidth',
    textAlign,
    light,
    flexItem,
    sx,
    style
  } = element.props;

  return (
    <MuiDivider
      orientation={orientation as 'horizontal' | 'vertical'}
      variant={variant as 'fullWidth' | 'inset' | 'middle'}
      textAlign={textAlign as 'left' | 'center' | 'right'}
      light={light as boolean}
      flexItem={flexItem as boolean}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {children}
    </MuiDivider>
  );
};
