'use client';

import React from 'react';
import { Badge as MuiBadge, Chip } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Badge = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    badgeContent,
    color = 'primary',
    variant = 'standard',
    max,
    showZero,
    invisible,
    overlap,
    anchorOrigin,
    sx,
    style
  } = element.props;

  // If used as a standalone badge (like a chip/tag)
  if (!children && content) {
    return (
      <Chip
        label={content as string}
        color={color as any}
        variant={variant === 'dot' ? 'outlined' : 'filled'}
        size="small"
        sx={sx as any}
        style={style as React.CSSProperties}
      />
    );
  }

  // If used as a badge overlay
  return (
    <MuiBadge
      badgeContent={badgeContent as React.ReactNode}
      color={color as any}
      variant={variant as 'standard' | 'dot'}
      max={max as number}
      showZero={showZero as boolean}
      invisible={invisible as boolean}
      overlap={overlap as 'rectangular' | 'circular'}
      anchorOrigin={anchorOrigin as any}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {children}
    </MuiBadge>
  );
};
