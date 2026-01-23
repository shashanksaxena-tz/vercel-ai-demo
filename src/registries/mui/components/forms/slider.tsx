'use client';

import React from 'react';
import { Slider as MuiSlider, Box, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Slider = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    disabled,
    marks,
    valueLabelDisplay = 'auto',
    color = 'primary',
    size = 'medium',
    orientation = 'horizontal',
    action,
    sx,
    style
  } = element.props;

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: newValue } } as never);
    }
  };

  return (
    <Box sx={{ width: '100%', ...sx as any }} style={style as React.CSSProperties}>
      {label && (
        <Typography gutterBottom>
          {label as string}
        </Typography>
      )}
      <MuiSlider
        value={value as number}
        defaultValue={defaultValue as number}
        min={min as number}
        max={max as number}
        step={step as number}
        disabled={disabled as boolean}
        marks={marks as boolean | { value: number; label: string }[]}
        valueLabelDisplay={valueLabelDisplay as 'auto' | 'on' | 'off'}
        color={color as 'primary' | 'secondary'}
        size={size as 'small' | 'medium'}
        orientation={orientation as 'horizontal' | 'vertical'}
        onChange={handleChange}
      />
    </Box>
  );
};
