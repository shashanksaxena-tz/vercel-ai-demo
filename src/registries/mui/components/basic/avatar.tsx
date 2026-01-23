'use client';

import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Avatar = ({ element, children }: ComponentRenderProps) => {
  const {
    src,
    alt,
    name,
    size = 40,
    variant = 'circular',
    sx,
    style
  } = element.props;

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a color based on name
  const stringToColor = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  return (
    <MuiAvatar
      src={src as string}
      alt={alt as string || name as string}
      variant={variant as 'circular' | 'rounded' | 'square'}
      sx={{
        width: size as number,
        height: size as number,
        bgcolor: name ? stringToColor(name as string) : undefined,
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {!src && name && getInitials(name as string)}
      {children}
    </MuiAvatar>
  );
};
