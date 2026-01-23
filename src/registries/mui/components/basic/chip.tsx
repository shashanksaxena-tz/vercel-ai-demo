'use client';

import React from 'react';
import { Chip as MuiChip, Avatar } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Chip = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    color = 'default',
    variant = 'filled',
    size = 'medium',
    avatar,
    avatarSrc,
    deletable,
    clickable,
    action,
    onDelete,
    sx,
    style
  } = element.props;

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  const handleDelete = deletable || onDelete ? () => {
    if (onDelete && onAction) {
      onAction({ name: onDelete as string });
    }
  } : undefined;

  const avatarElement = avatarSrc ? (
    <Avatar src={avatarSrc as string} />
  ) : avatar ? (
    <Avatar>{(avatar as string).charAt(0).toUpperCase()}</Avatar>
  ) : undefined;

  return (
    <MuiChip
      label={label as string}
      color={color as any}
      variant={variant as 'filled' | 'outlined'}
      size={size as 'small' | 'medium'}
      avatar={avatarElement}
      onClick={clickable || action ? handleClick : undefined}
      onDelete={handleDelete}
      sx={sx as any}
      style={style as React.CSSProperties}
    />
  );
};
