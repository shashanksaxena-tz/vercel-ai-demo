'use client';

import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Pagination = ({ element, onAction }: ComponentRenderProps) => {
  const {
    count = 10,
    page = 1,
    color = 'primary',
    variant = 'outlined',
    shape = 'rounded',
    size = 'medium',
    showFirstButton,
    showLastButton,
    disabled,
    siblingCount = 1,
    boundaryCount = 1,
    action,
    sx,
    style
  } = element.props;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { page: value } } as never);
    }
  };

  return (
    <Box sx={sx as any} style={style as React.CSSProperties}>
      <MuiPagination
        count={count as number}
        page={page as number}
        color={color as 'primary' | 'secondary' | 'standard'}
        variant={variant as 'text' | 'outlined'}
        shape={shape as 'circular' | 'rounded'}
        size={size as 'small' | 'medium' | 'large'}
        showFirstButton={showFirstButton as boolean}
        showLastButton={showLastButton as boolean}
        disabled={disabled as boolean}
        siblingCount={siblingCount as number}
        boundaryCount={boundaryCount as number}
        onChange={handleChange}
      />
    </Box>
  );
};
