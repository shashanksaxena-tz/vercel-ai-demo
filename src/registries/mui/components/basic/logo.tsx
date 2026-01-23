'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Logo = ({ element, children }: ComponentRenderProps) => {
  const {
    src,
    alt,
    text,
    width = 120,
    height = 'auto',
    sx,
    style
  } = element.props;

  if (src) {
    return (
      <Box
        component="img"
        src={src as string}
        alt={alt as string || 'Logo'}
        sx={{
          width: width as number | string,
          height: height as number | string,
          objectFit: 'contain',
          ...sx as any
        }}
        style={style as React.CSSProperties}
      />
    );
  }

  return (
    <Typography
      variant="h6"
      component="span"
      sx={{
        fontWeight: 'bold',
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {(text as React.ReactNode) || children}
    </Typography>
  );
};
