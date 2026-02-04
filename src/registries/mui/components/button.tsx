import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Button = ({ element, onAction }: ComponentRenderProps) => {
  const { variant = 'default', size = 'default', children, label, action, style, disabled } = element.props;

  // Map variants
  let muiVariant: 'contained' | 'outlined' | 'text' = 'contained';
  let color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' = 'primary';

  switch (variant) {
    case 'secondary':
      muiVariant = 'outlined';
      color = 'secondary';
      break;
    case 'destructive':
      muiVariant = 'contained';
      color = 'error';
      break;
    case 'ghost':
    case 'link':
      muiVariant = 'text';
      break;
    case 'outline':
      muiVariant = 'outlined';
      break;
    case 'default':
    default:
      muiVariant = 'contained';
      break;
  }

  // Map sizes
  let muiSize: 'small' | 'medium' | 'large' = 'medium';
  switch (size) {
    case 'sm':
      muiSize = 'small';
      break;
    case 'lg':
      muiSize = 'large';
      break;
    default:
      muiSize = 'medium';
      break;
  }

  return (
    <MuiButton
      variant={muiVariant}
      color={color}
      size={muiSize}
      onClick={() => action && onAction?.({ name: action as string })}
      disabled={disabled as boolean}
      style={style as React.CSSProperties}
      fullWidth={element.props.fullWidth as boolean}
    >
      {(label || children) as React.ReactNode}
    </MuiButton>
  );
};
