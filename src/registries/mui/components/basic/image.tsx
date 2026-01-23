'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Image = ({ element }: ComponentRenderProps) => {
  const {
    src,
    alt,
    width,
    height,
    objectFit = 'cover',
    borderRadius,
    sx,
    style
  } = element.props;

  return (
    <Box
      component="img"
      src={src as string}
      alt={alt as string}
      sx={{
        width: width as number | string,
        height: height as number | string,
        objectFit: objectFit as any,
        borderRadius: borderRadius as number | string,
        display: 'block',
        maxWidth: '100%',
        ...sx as any
      }}
      style={style as React.CSSProperties}
    />
  );
};
