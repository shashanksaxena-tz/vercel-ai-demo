'use client';

import React from 'react';
import { Icon as MuiIcon, SvgIcon } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Icon = ({ element }: ComponentRenderProps) => {
  const {
    name,
    icon,
    color,
    fontSize = 'medium',
    sx,
    style
  } = element.props;

  return (
    <MuiIcon
      color={color as any}
      fontSize={fontSize as 'inherit' | 'small' | 'medium' | 'large'}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {(name || icon) as string}
    </MuiIcon>
  );
};
