'use client';

import React from 'react';
import { Paper as MuiPaper } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Paper = ({ element, children }: ComponentRenderProps) => {
  const {
    elevation = 1,
    variant = 'elevation',
    square,
    sx,
    style
  } = element.props;

  return (
    <MuiPaper
      elevation={elevation as number}
      variant={variant as 'elevation' | 'outlined'}
      square={square as boolean}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {children}
    </MuiPaper>
  );
};
