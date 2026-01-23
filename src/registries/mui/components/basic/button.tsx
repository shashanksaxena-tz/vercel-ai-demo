'use client';

import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Button = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    variant = 'contained',
    size = 'medium',
    color = 'primary',
    label,
    children: propsChildren,
    action,
    disabled,
    startIcon,
    endIcon,
    fullWidth,
    sx,
    style
  } = element.props;

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    } else if (element.props.onClick && onAction) {
      onAction({ name: element.props.onClick as string });
    }
  };

  const content = label || propsChildren || children;

  return (
    <MuiButton
      variant={variant as 'contained' | 'outlined' | 'text'}
      size={size as 'small' | 'medium' | 'large'}
      color={color as 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'}
      onClick={handleClick}
      disabled={disabled as boolean}
      fullWidth={fullWidth as boolean}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {content as React.ReactNode}
    </MuiButton>
  );
};
