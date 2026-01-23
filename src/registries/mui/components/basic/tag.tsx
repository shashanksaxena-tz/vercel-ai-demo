'use client';

import React from 'react';
import { Chip } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Tag = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    content,
    color = 'default',
    variant = 'outlined',
    size = 'small',
    onDelete,
    action,
    icon,
    sx,
    style
  } = element.props;

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  const handleDelete = onDelete ? () => {
    if (onAction) {
      onAction({ name: onDelete as string });
    }
  } : undefined;

  return (
    <Chip
      label={(label || content) as string}
      color={color as any}
      variant={variant as 'filled' | 'outlined'}
      size={size as 'small' | 'medium'}
      onClick={action ? handleClick : undefined}
      onDelete={handleDelete}
      sx={sx as any}
      style={style as React.CSSProperties}
    />
  );
};
