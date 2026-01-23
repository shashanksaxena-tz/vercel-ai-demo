'use client';

import React from 'react';
import { Rating as MuiRating, Box, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Rating = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    value,
    defaultValue,
    max = 5,
    precision = 1,
    disabled,
    readOnly,
    size = 'medium',
    highlightSelectedOnly,
    action,
    sx,
    style
  } = element.props;

  const handleChange = (_: React.SyntheticEvent, newValue: number | null) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: newValue } } as never);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx as any }} style={style as React.CSSProperties}>
      {label && (
        <Typography component="legend">
          {label as string}
        </Typography>
      )}
      <MuiRating
        name={name as string}
        value={value as number}
        defaultValue={defaultValue as number}
        max={max as number}
        precision={precision as number}
        disabled={disabled as boolean}
        readOnly={readOnly as boolean}
        size={size as 'small' | 'medium' | 'large'}
        highlightSelectedOnly={highlightSelectedOnly as boolean}
        onChange={handleChange}
      />
    </Box>
  );
};
