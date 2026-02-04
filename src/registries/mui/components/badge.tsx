import React from 'react';
import { Chip } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Badge = ({ element }: ComponentRenderProps) => {
  const { variant = 'default', children, label, style } = element.props;

  let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
  let muiVariant: 'filled' | 'outlined' = 'filled';

  switch (variant) {
    case 'secondary':
      color = 'secondary';
      break;
    case 'destructive':
      color = 'error';
      break;
    case 'outline':
      muiVariant = 'outlined';
      break;
    default:
      color = 'primary';
      break;
  }

  return (
    <Chip
      label={(label || children) as React.ReactNode}
      color={color}
      variant={muiVariant}
      size="small"
      style={style as React.CSSProperties}
    />
  );
};
