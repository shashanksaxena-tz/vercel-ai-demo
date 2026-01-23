'use client';

import React from 'react';
import { LinearProgress, CircularProgress, Box, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Progress = ({ element }: ComponentRenderProps) => {
  const {
    value,
    variant = 'determinate',
    type = 'linear',
    color = 'primary',
    size = 40,
    thickness = 4,
    showLabel,
    label,
    sx,
    style
  } = element.props;

  const labelText = label || `${Math.round(value as number)}%`;

  if (type === 'circular') {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', ...sx as any }} style={style as React.CSSProperties}>
        <CircularProgress
          variant={variant as 'determinate' | 'indeterminate'}
          value={value as number}
          color={color as 'primary' | 'secondary' | 'inherit'}
          size={size as number}
          thickness={thickness as number}
        />
        {showLabel && (
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {labelText as React.ReactNode}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', ...sx as any }} style={style as React.CSSProperties}>
      {showLabel && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant={variant as 'determinate' | 'indeterminate' | 'buffer'}
              value={value as number}
              color={color as 'primary' | 'secondary' | 'inherit'}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {labelText as React.ReactNode}
            </Typography>
          </Box>
        </Box>
      )}
      {!showLabel && (
        <LinearProgress
          variant={variant as 'determinate' | 'indeterminate' | 'buffer'}
          value={value as number}
          color={color as 'primary' | 'secondary' | 'inherit'}
        />
      )}
    </Box>
  );
};
