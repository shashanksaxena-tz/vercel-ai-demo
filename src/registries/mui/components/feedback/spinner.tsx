'use client';

import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Spinner = ({ element }: ComponentRenderProps) => {
  const {
    size = 40,
    color = 'primary',
    thickness = 3.6,
    label,
    sx,
    style
  } = element.props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      <CircularProgress
        size={size as number}
        color={color as 'primary' | 'secondary' | 'inherit'}
        thickness={thickness as number}
      />
      {label && (
        <Typography variant="body2" color="text.secondary">
          {label as string}
        </Typography>
      )}
    </Box>
  );
};
